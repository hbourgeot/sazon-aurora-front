import type { FoodProduct } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { svelxios }, url }) => {
  const { data } = await svelxios.get<FoodProduct>(`/user/${url.searchParams.get('user_id')}/recommendations`);
  return json(data);
};
