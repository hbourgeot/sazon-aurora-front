<script lang="ts">
  import { empty, emptyCart } from "$lib/assets";
  import { cart } from "$lib/store/cart.store";
  import { Minus, Plus } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Button, Drawer, InputNumber, Portal } from "stwui";
  import Product from "./Product.svelte";
  import type { FoodProduct } from "$lib/types";
  import { formatNumber } from "stwui/utils";

  export let open = false;
  let pagar = false;

  function handleClose() {
    open = false;
  }

  function minusOrRemove(indx: number) {
    return () => {
      if ($cart.products[indx].amount > 1) {
        $cart.products[indx].amount--; // Disminuye la cantidad
      } else {
        $cart.products.splice(indx, 1); // Elimina el producto
      }
      $cart.products = $cart.products.slice(); // Clave para reactividad
    };
  }

  function add(indx: number) {
    $cart.products[indx].amount++; // Aumenta la cantidad
    $cart.products = $cart.products.slice(); // Clave para reactividad
  }
</script>

<Portal>
  {#if open}
    <Drawer {handleClose}>
      <Drawer.Header>
        <h2 class="text-2xl">
          Tu <span class="gradient text-3xl">Carrito</span>
        </h2>
      </Drawer.Header>
      <Drawer.Content class="!p-4">
        {#if $cart.products.length === 0}
          <img src={emptyCart} alt="empty cart" class="w-1/2 mx-auto" />
          <p class="text-center">No tienes productos en tu carrito</p>
        {:else}
          {#each $cart.products as product, indx}
            <section class="flex justify-between w-full p-4">
              <img
                src={product?.image ?? empty}
                alt={product.name}
                class="w-20 h-20 object-top rounded-lg" />
              <div class="flex flex-col justify-center w-1/3">
                <h3 class="text-lg font-semibold truncate">{product.name}</h3>
                <p class="text-sm truncate">{product.description}</p>
              </div>
              <div class="flex flex-col justify-center w-1/3">
                <p class="text-lg font-semibold text-center font-sans">
                  {formatNumber(product.price * product.amount, {
                    style: "currency",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })
                    .replaceAll(",", "+")
                    .replace(".", ",")
                    .replaceAll("+", ".")}
                </p>
                <div class="flex justify-between items-center">
                  <Button type="ghost" size="xs" on:click={minusOrRemove(indx)}>
                    <Icon src={Minus} class="h-4 w-4" />
                  </Button>
                  <InputNumber
                    type="number"
                    bind:value={product.amount}
                    class="w-10 text-center p-0" />
                  <Button type="ghost" size="xs" on:click={() => add(indx)}>
                    <Icon src={Plus} class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>
          {/each}
        {/if}
      </Drawer.Content>
      <Drawer.Footer>
        {#if $cart.products.length > 0}
          <Button type="primary" block on:click={() => pagar = true}>Pagar</Button>
          <Button type="ghost" block on:click={() => ($cart.products = [])}>
            Vaciar carrito
          </Button>
        {/if}
      </Drawer.Footer>
      <Portal>
        {#if pagar}
          <Drawer open={pagar} handleClose={() => (pagar = false)}>
            <Drawer.Header>
              <h2 class="text-2xl">
                Pagar
              </h2>
            </Drawer.Header>
            <Drawer.Content class="!p-4">
              <p>Total a pagar: <span class="font-sans">{formatNumber($cart.totalAmount, {
                style: "currency",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              })}</span></p>
            </Drawer.Content>
            <Drawer.Footer>
              <Button type="primary" block>Pagar</Button>
            </Drawer.Footer>
          </Drawer>
        {/if}
      </Portal>
    </Drawer>
  {/if}
</Portal>
