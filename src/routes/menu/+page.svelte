<script lang="ts">
  import Product from "$lib/components/Product.svelte";
import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="mx-auto flex justify-evenly items-center flex-col h-full">
    <h1>Menú del Sazón de <span class="gradient">Aurora</span></h1>
    <section class="gridify">
        {#each data.foods as food}
        <Product
        title={food.name}
        description={food.description}
        price={food.price}
        image={food.image}
        />
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
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
</style>