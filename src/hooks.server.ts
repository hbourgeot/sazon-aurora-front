
import { client } from "$lib/server/client";
import { supabase } from "$lib/server/supabase";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
  

const clientHandler: Handle=async ({event, resolve}) => {
  event.locals.svelxios = client;

  return await resolve (event)
}

const supaHandler: Handle = async ({ event, resolve }) => {
  event.locals.supa = supabase;

  return await resolve(event);
}

const trackers: Handle=async ({event, resolve}) => {
  return await resolve (event)
}

export const handle = sequence(clientHandler, trackers);
  