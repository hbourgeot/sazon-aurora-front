import type { Food, User } from "$lib/types";
import { fail } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { svelxios } }) => {
  const { data: users }: { data: User[] } = await svelxios.get("/user/all");

  //@ts-ignore
  return {
    users
  };
}) satisfies PageServerLoad;