import type { Food, FoodProduct } from "$lib/types";
import { writable } from "svelte/store";

export const cart = writable({
  products: [] as FoodProduct[],
  totalAmount: 0,
})

export const addToCart = (product: FoodProduct) => {
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

export const increaseAmount = (id: number) => {
  cart.update((state) => {
    const existingProduct = state.products[id];
    if (existingProduct) {
      existingProduct.amount += 1;
      state.totalAmount += existingProduct.price;
    }
    return state;
  });
}

export const decreaseAmount = (id: number) => {
  cart.update((state) => {
    const existingProduct = state.products[id];
    if (existingProduct) {
      existingProduct.amount -= 1;
      state.totalAmount -= existingProduct.price;
    }
    return state;
  });
}