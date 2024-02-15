import type { Food } from "$lib/types";
import { writable } from "svelte/store";

export const cart = writable({
  products: [] as Food[],
  totalAmount: 0,
})

export const addToCart = (product: Food) => {
  cart.update((state) => {
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