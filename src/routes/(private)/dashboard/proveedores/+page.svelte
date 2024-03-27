<script lang="ts">
  import type { PageData } from "./$types";
  //   import Table from "$lib/components/Table.svelte";
  import Table from "$lib/components/ProvidersTable.svelte";
  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";
  import type { Crumb } from "$lib/types";

  export let data: PageData;

  let rows = data.providers;
  $: rows = data.providers;

  const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Productos", href: "/dashboard/Productos" },
  ];
setBreadcrumbs(routes);
</script>

<main class="flex h-[calc(100vh-40px)] w-full flex-col items-center justify-start px-6 py-3 mt-5 lg:mt-10">
	<h1 class="w-full p-2 lg:p-5 pb-2 text-center lg:!text-left text-3xl lg:text-4xl">Proveedores</h1>
	<Table data={rows} />
</main>
