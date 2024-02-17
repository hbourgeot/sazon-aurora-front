import {
  PUBLIC_SUPABASE_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import type { SupaDB } from "$lib/database.types";
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
import type { LayoutLoad } from "./$types";

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

  let {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.email) {
    const { data: user, error } = await supabase.from('users').select('*').eq('email', session.user.email).single()
    if (error) {
      console.error(error);
      return;
    }

    console.log(user);
    session = {
      ...session,
      user: {
        ...session?.user,
        // @ts-ignore
        database: user,
      },
    }
  }

  return { supa: supabase, session };
};
