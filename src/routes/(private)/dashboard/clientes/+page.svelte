<script lang="ts">
  import Table from "$lib/components/CustomersTable.svelte";

  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";
  import type { Crumb } from "$lib/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let rows = data.users;
  $: rows = data.users;

  const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Clientes", href: "/dashboard/clientes" },
  ];

    let formData = {
      id: "",
      name: "",
      role: "",
      email: "",
      document: "",
    }

    setBreadcrumbs(routes);
</script>

<main class="flex h-[calc(100vh-40px)] w-full flex-col items-center justify-start px-6 py-3 mt-5 lg:mt-10">
	<h1 class="w-full p-2 lg:p-5 pb-2 text-center lg:!text-left text-3xl lg:text-4xl">Clientes</h1>
	<Table data={rows} />
</main>
