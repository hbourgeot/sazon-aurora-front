import { Product, type Food } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";
import dayjs from "dayjs";

export const load = (async ({ locals: { svelxios } }) => {
  const { data: dishes }: { data: Food[] } = await svelxios.get("/food/all");

  const foods = dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: dish.price,
    created_at: dayjs(dish.created_at).format("DD/MM/YYYY"),
  }));

  const {data: products} = await svelxios.get<Product[]>("/product/all");

  //@ts-ignore
  return { foods, products: products.filter(product => product?.stock > 0)};
}) satisfies PageServerLoad;

export const actions: Actions = {
  submit: async ({ locals: { svelxios }, request }) => {
    let payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
    >;

    payload = {
      ...payload,
      id: null,
    };
    console.log(payload);
    const { data: product } = await svelxios.post<Food>(
      "/food/new",
      payload
    );
    console.log(product);
  },

  edit: async ({ locals: { svelxios }, request }) => {
    let payload = Object.fromEntries(await request.formData()) as Record<
      string,
      any
    >;

    payload = {
      ...payload,
      id: parseInt(payload.id),
      stock: parseInt(payload.stock),
    };

    console.log(payload);
    const { data } = await svelxios.put(`/food/${payload.id}`, payload);

    console.log(data);
  },
};