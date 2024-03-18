<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import PdfViewer from "svelte-pdf";
  export let data: PageData;
  let file = "";

  onMount(async () => {
    await getFile();
  });

  const getFile = async () => {
    const res = await fetch(data.href);
    const blob = await res.blob();
    file = URL.createObjectURL(blob);
  };
</script>

<section>
  {#if file}
    <div class="!max-h-screen">
      <PdfViewer url={file} downloadFileName="recibo.pdf" />
    </div>
  {:else}
    <h1 class="text-4xl p-2 text-center w-full h-full flex items-center justify-center">
      Cargando recibo...
    </h1>
  {/if}
</section>