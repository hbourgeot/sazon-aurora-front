import type { Food, User } from "$lib/types";
import { fail } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { svelxios } }) => {
  const { data: users }: { data: User[] } = await svelxios.get("/user/all");

  const usersWithoutPassword: {
    document: string;
    email: string;
    id: number;
    name: string;
  }[] = [];
  
  users.forEach((user) => {
    if (user.role === 3) {
      usersWithoutPassword.push({
        id: user.id, 
        name: user.name, 
        email: user.email, 
        document: user.document
      });
    }
  });
  //@ts-ignore
  return {
    users: usersWithoutPassword,
  };
}) satisfies PageServerLoad;
