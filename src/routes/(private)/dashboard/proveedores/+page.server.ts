import type { Provider } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals: { svelxios } }) => {
  const {
    data: providers,
  }: {
    data: Provider[];
  } = await svelxios.get("/provider/all");
  return { providers: providers };
}) satisfies PageServerLoad;

export const actions: Actions = {
  submit: async ({ locals: { svelxios }, request }) => {
    const payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
      >;
    
    console.log(payload);
    

    const { data } = await svelxios.post("/provider/new", payload);
  },

  edit: async ({ locals: { svelxios }, request }) => {
    const payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
    >;

    const { data } = await svelxios.put(`/provider/${payload.id}`, payload);
  },
};
