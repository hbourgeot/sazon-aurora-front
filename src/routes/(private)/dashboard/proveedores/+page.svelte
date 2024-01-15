<script lang="ts">
  import type { PageData } from "./$types";
//   import Table from "$lib/components/Table.svelte";
  import type { TableColumn } from "stwui/types";

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

  const rows = [
    {
      id: 1,
      name: "Proveedor 1",
      contact: "Contacto 1",
      contactType: "Tipo de contacto 1",
      address: "Dirección 1",
    },
    {
      id: 2,
      name: "AProveedor 2",
      contact: "Contacto 2",
      contactType: "Tipo de contacto 2",
      address: "Dirección 2",
    },
    {
      id: 3,
      name: "Proveedor 3",
      contact: "Contacto 3",
      contactType: "Tipo de contacto 3",
      address: "Dirección 3",
    },
  ];
</script>

<main class="w-full p-3">
    <h1 class="text-4xl">Hola</h1>
  <!-- <Table {rows} {columns} title="Proveedores" /> -->
</main>
