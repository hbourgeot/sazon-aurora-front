import type { Product, Food, FoodProduct } from "$lib/types";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import dayjs from "dayjs";

export const load = (async ({ locals: { svelxios } }) => {
  const { data: dishes }: { data: FoodProduct[] } = await svelxios.get(
    "/food/all"
  );

  const foods = dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: dish.price,
    created_at: dayjs(dish.created_at).format("DD/MM/YYYY"),
    products:
      dish.products.map((product) => product.product.name).join(", ").length > 1
        ? dish.products.map((product) => product.product.name).join(", ")
        : "No hay productos",
  }));

  const { data: products } = await svelxios.get<Product[]>("/product/all");

  const foodsWithProducts = foods.map((food) => {
    const foodProducts = dishes.find((dish) => dish.id === food.id)?.products;
    const productsWithAmount = foodProducts?.map((product) => ({
      ...product.product,
      amount: product.amount,
    }));
    return { ...food, products: productsWithAmount };
  });

  //@ts-ignore
  return {
    foods,
    products: products.filter(
      (product) => product?.stock > 0,
      foodsWithProducts
    ),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  submit: async ({ locals: { svelxios }, request }) => {
    const form = await request.formData();
    let payload = Object.fromEntries(form) as Record<string, any>;

    const products: { id: number; quantity: number }[] = form
      .getAll("products")
      .map((product) => {
        const productParsed: { id: number; quantity: number } = JSON.parse(
          product.toString()
        );
        return {
          id: productParsed.id,
          quantity: productParsed.quantity,
        };
      });

    payload = {
      name: payload.name,
      description: payload.description,
      price: parseFloat(payload.price),
      created_at: dayjs().toISOString(),
    };

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("price", payload.price);
    formData.append("created_at", payload.created_at);

    const {
      data: [food],
    }: { data: [Food, number] } = await svelxios.post("/food/new", payload);
    console.log(food);

    for (const product of products) {
      const { data: idk } = await svelxios.post(
        `/food/${food.id}/product/${product.id}`,
        null,
        { params: { quantity: product.quantity } }
      );
    }
  },

  edit: async ({ locals: { svelxios }, request }) => {
    try {
      const form = await request.formData();
      let payload = Object.fromEntries(form) as Record<string, any>;
      const foodId = Number(payload.id);

      payload = {
        name: payload.name,
        description: payload.description,
        price: parseFloat(payload.price),
        created_at: dayjs().toISOString(),
      };

      console.log(payload);
      const { data: food, status } = await svelxios.patch(
        `/food/${foodId}`,
        payload
      );

      if (status >= 400) {
        throw fail(status, food.message);
      }

      const products: { id: number; quantity: number }[] = form
        .getAll("products")
        .map((product) => {
          const productParsed: { id: number; quantity: number } = JSON.parse(
            product.toString()
          );
          return {
            id: productParsed.id,
            quantity: productParsed.quantity,
          };
        });

      for (const product of products) {
        const { data: idk } = await svelxios.post(
          `/food/${foodId}/product/${product.id}`,
          null,
          { params: { quantity: product.quantity } }
        );
      }
    } catch (error) {
      console.error(error.response.data.detail);
    }
  },
};
