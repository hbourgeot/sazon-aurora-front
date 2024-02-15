<script lang="ts">
  import Product from "$lib/components/Product.svelte";
  import { Icon } from "@steeze-ui/svelte-icon";
  import type { PageData } from "./$types";
  import { ShoppingCart } from "@steeze-ui/heroicons";
  import { tooltip } from "stwui/actions";
  import { goto } from "$app/navigation";
  import { cart } from "$lib/store/cart.store";
  export let data: PageData;
</script>

<main class="mx-auto h-full !p-4">
  <button
    class="fixed top-6 right-6 rounded-full h-11 w-11 p-2 flex justify-center items-center {$cart
      .products.length > 0
      ? 'text-white bg-primary'
      : 'text-primary'}"
    on:click={() => goto("/carrito")}
    use:tooltip={{
      placement: "left",
      content: "Ver tu carrito",
      arrow: true,
      animation: "scale",
      theme: "primary",
    }}>
    <Icon src={ShoppingCart} class="!h-10 !w-10" />
    {#if $cart.products.length > 0}
      <span
        class="absolute -top-1 -right-1 bg-hover text-white rounded-full h-5 w-5 flex justify-center items-center font-sans">
        {$cart.products.length}
      </span>
    {/if}
  </button>
  <h1 class="p-4 my-5 lg:my-10">
    Menú del Sazón de <span class="gradient">Aurora</span>
  </h1>
  <section class="gridify">
    {#each data.foods as food}
      <Product
        {food}
        title={food.name}
        description={food.description}
        price={food.price}
        image={food.image} />
    {/each}
  </section>
</main>

<style>
  main {
    padding: 1rem;
    width: 90%;
    margin: 0 auto;
    max-width: 1500px;
  }

  .gridify {
    width: 100%;
    max-width: 1500px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
</style>
