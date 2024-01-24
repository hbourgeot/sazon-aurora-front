<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import FormDrawer4Foods from "$lib/components/forms/FormDrawer4Foods.svelte";

  import type { TableColumn } from "stwui/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let rows = data.foods;
  $: rows = data.foods;

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
  ];

    let formData = {
        id: null,
        name: "",
        description: "",
        price: "",
        created_at: "",
    };
</script>

<main class="w-full h-full">
  <h1 class="text-4xl p-5">Productos</h1>
  <Table
    {rows}
    {columns}
    title="Lista de productos registrados"
    formAction="?/submit"
    formTitle="Productos"
    FormComponent={FormDrawer4Foods}
    {formData}
  />
</main>
