<script lang="ts">
  import MenuProduct from "$lib/components/MenuProduct.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import type { FoodProduct } from "$lib/types";

  export let data: PageData;

  let recomendaciones: FoodProduct[] = [];

  const getRecomendaciones = async () => {
    //@ts-ignore
    const user = data.session?.user?.database?.id;
    const res = await fetch("/api/recomendaciones?user_id="+user);
    const jsonData = await res.json();
    recomendaciones = jsonData;
  };

  onMount(async() => {
    await getRecomendaciones();
  });
</script>
<main class="w-full h-full min-h-screen">
  <MenuProduct {recomendaciones}/>
</main>