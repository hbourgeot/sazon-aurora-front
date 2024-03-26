<script lang="ts">
  import Table from "$lib/components/PlatillosTable.svelte";
  import FormDrawer4Products from "$lib/components/forms/FormDrawer4Products.svelte";
  import type { TableColumn } from "stwui/types";
  import type { PageData } from "./$types";
  import type { Crumb } from "$lib/types";
  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";

  export let data: PageData;

  let rows = data.products;
  $: rows = data.products;

  let formData = {
    id: null,
    name: "",
    description: "",
    stock: "",
    provider_id: "",
  };

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
      column: "stock",
      label: "Disponibles",
      placement: "center",
      class: "",
    },
    {
      column: "provider_id",
      label: "Proveedor",
      placement: "center",
      class: "",
    },
  ];

const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Productos", href: "/dashboard/Productos" },
  ];
setBreadcrumbs(routes);
</script>

<main class="w-full h-full">
  <h1 class="text-4xl p-5">Productos</h1>
  <Table
    {rows}
    {columns}
    title="Lista de productos registrados"
    formAction="?/submit"
    formTitle="Productos"
    FormComponent={FormDrawer4Products}
    {formData}
  />
</main>
