import type { User } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, locals: { svelxios } }) => {
    const {
      email,
      password,
      name,
      lastname,
      documentType,
      document,
    }: {
      email?: string;
      password?: string;
      name?: string;
      lastname?: string;
      documentType?: string;
      document?: string | number;
    } = Object.fromEntries(await request.formData());

    const payload = {
      email,
      name: `${name} ${lastname}`,
      document: `${documentType}-${document}`,
      role: 2,
    };

    const { data } = await svelxios.post("/user/new", payload);
    if (data.error) {
      return fail(400, {
        status: 400,
        body: data.error,
      });
    }

    throw redirect(302, "/dashboard");
  },
};
