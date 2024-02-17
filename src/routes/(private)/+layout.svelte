<script lang="ts">
  import { page } from "$app/stores";
  import BreadCrumbs from "$lib/components/BreadCrumbs.svelte";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  export let data: LayoutData;

  $: if (
    // @ts-ignore
    (!data?.session?.user || data.session?.user.database.role === 3) &&
    browser
  )
    goto("/");
  onMount(() => {
    if (!data?.session?.user && browser) goto("/");
  });
</script>

<section class="bg-rose-200 h-full w-full">
  {#if $page.url.pathname === "/dashboard"}
    <h1 class="text-4xl p-2 top-3 right-2 absolute">
      {#if data.session?.user}
        Hola,
        <span class="gradient">
          {data.session?.user?.user_metadata.name}
        </span>
      {/if}
    </h1>
  {:else}
    <BreadCrumbs className="absolute top-3 right-5" />
  {/if}
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>
