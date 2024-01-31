<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<section class="bg-rose-200 h-full flex flex-col justify-center items-center">
  <h2 class="text-4xl p-2 top-3 right-2 absolute">
    Hola,
    <span class="gradient">
      {data.session?.user?.user_metadata.name ?? "fulanito"}
    </span>
  </h2>
  <slot />
</section>
