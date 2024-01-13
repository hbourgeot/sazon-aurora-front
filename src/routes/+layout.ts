import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import type{ SupaDB } from "$lib/database.types";
import type { LayoutLoad } from "./$types";
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
import type {Session} from "@supabase/supabase-js";
import {SupabaseClient} from "@supabase/supabase-js";

export const load: LayoutLoad = async ({ data, depends }) => {
  depends("supabase:auth");

  const supabase = createBrowserClient<SupaDB>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_KEY,
    {
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          if (!isBrowser()) {
            //@ts-ignore
            return JSON.stringify(data?.session);
          }

          const cookie = parse(document.cookie);
          return cookie[key];
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supa: supabase, session };
};
