<script lang="ts">
  import Table from "$lib/components/Table.svelte";

  import { setBreadcrumbs } from "$lib/store/breadcrumbs.store";
  import type { Crumb } from "$lib/types";
  import type { TableColumn } from "stwui/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  let rows = data.users;
  $: rows = data.users;

  const routes: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Clientes", href: "/dashboard/clientes" },
  ];

  const columns: TableColumn[] = [
   {column: "id", label: "ID", placement: "center"},
    {column: "name", label: "Nombre", placement: "center"},
    {column: "email", label: "Correo", placement: "center"},
    {column: "document", label: "Documento de Identidad", placement: "center"},
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

<main class="py-3 px-6 flex flex-col justify-center items-center h-full w-full">
  <h1 class="text-4xl p-5 pb-2 !text-left w-full">Clientes</h1>
  <Table
    {rows}
    {columns}
    title="Lista de clientes registrados"
    formAction="?/submit"
    formTitle="clientes"
    FormComponent={null}
    {formData}
  />
</main>
