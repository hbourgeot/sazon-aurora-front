<script lang="ts">
  import type { PageData } from "./$types";
  //   import Table from "$lib/components/Table.svelte";
  import type { TableColumn } from "stwui/types";
  import Table from "$lib/components/PlatillosTable.svelte";
  import FormDrawer4Providers from "$lib/components/forms/FormDrawer4Providers.svelte";
  import type { Crumb } from "$lib/types";
  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";

  export let data: PageData;

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
      column: "contact",
      label: "Contacto",
      placement: "center",
      class: "",
    },
    {
      column: "contactType",
      label: "Tipo de contacto",
      placement: "center",
      class: "",
    },
    {
      column: "address",
      label: "Dirección",
      placement: "center",
      class: "truncate hover:overflow-visible",
    },
  ];

  let rows = data.providers;
  $: rows = data.providers;

  let formData = {
    id: null,
    name: "",
    contact: "",
    contact_type: "",
    address: "",
  };

  const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Productos", href: "/dashboard/Productos" },
  ];
setBreadcrumbs(routes);
</script>

<main class="w-full h-full">
  <h1 class="text-4xl p-5">Proveedores</h1>
  <Table
    {rows}
    {columns}
    title="Lista de proveedores registrados"
    formAction="?/submit"
    formTitle="Proveedor"
    FormComponent={FormDrawer4Providers}
    {formData}
  />
</main>
