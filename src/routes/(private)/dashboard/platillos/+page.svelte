<script lang="ts">
  import Table from "$lib/components/PlatillosTable.svelte";
  // import FormDrawer4Foods from "$lib/components/forms/FormDrawer4Foods.svelte";

  import type { PageData } from "./$types";
  import type { Crumb } from "$lib/types";
  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";

  export let data: PageData;

  let rows = data.foods;
  $: rows = data.foods;

  const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Platillos", href: "/dashboard/platillos" },
  ];

    let formData = {
        id: null,
        name: "",
        description: "",
        price: "",
        created_at: "",
        files: null
    };

    setBreadcrumbs(routes);
</script>

<main class="py-3 px-6 flex flex-col justify-center items-center h-full w-full">
  <h1 class="text-4xl p-5 pb-2 !text-left w-full">Platillos</h1>
  <!-- FormComponent={FormDrawer4Foods} -->
  <Table
    data={rows}
    title="Lista de platillos registrados"
    formAction="?/submit"
    formTitle="platillos"
    {formData}
  />
</main>
