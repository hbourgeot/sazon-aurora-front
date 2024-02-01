<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<section class="bg-rose-200 h-full w-full">
  <h2 class="text-4xl p-2 top-3 right-2 absolute">
    Hola,
    <span class="gradient">
      {data.session?.user?.user_metadata.name ?? "fulanito"}
    </span>
  </h2>
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .content{
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>