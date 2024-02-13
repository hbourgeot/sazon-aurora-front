<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import FormDrawer4Foods from "$lib/components/forms/FormDrawer4Foods.svelte";

  import type { TableColumn } from "stwui/types";
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

  const columns: TableColumn[] = [
    {
      column: "id",
      label: "ID",
      placement: "center",
      class: "",
    },
    {
      column: "name",
      label: "Nombre",
      placement: "center",
      class: "",
    },
    {
      column: "description",
      label: "Descripción",
      placement: "center",
      class: "",
    },
    {
      column: "price",
      label: "Precio",
      placement: "center",
      class: "",
    },
    {
      column: "created_at",
      label: "Creado",
      placement: "center",
      class: "",
    },
    {
      column: "products",
      label: "Productos",
      placement: "center",
      class: "",
    }
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
  <Table
    {rows}
    {columns}
    title="Lista de platillos registrados"
    formAction="?/submit"
    formTitle="platillos"
    FormComponent={FormDrawer4Foods}
    {formData}
  />
</main>
