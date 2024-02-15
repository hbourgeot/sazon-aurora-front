import type { Food, FoodProduct } from "$lib/types";
import { writable } from "svelte/store";

export const cart = writable({
  products: [] as FoodProduct[],
  totalAmount: 0,
})

export const addToCart = (product: FoodProduct) => {
  cart.update((state) => {
    console.log(product);
    const existingProduct = state.products.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.amount += 1;
    } else {
      state.products = [...state.products, { ...product, amount: 1 }];
    }
    state.totalAmount += product.price;
    return state;
  });
}