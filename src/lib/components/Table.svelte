<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Plus } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Button, Card, Pagination, Table } from "stwui";
  import type { TableColumn } from "stwui/types";
  import { encodeSearchParams } from "stwui/utils";

  export let columns: TableColumn[];
  export let rows: any[];
  export let title: string;

  // form props
  export let formTitle: string;
  export let formAction: string;
  export let FormComponent: any;
  export let formData: object | null;
  
  let order: "asc" | "desc";
  let orderBy: string;
  let baseUrl: string;
  let currentPage: string;
  let drawer = { open: false };

  $: {
    baseUrl = $page.url.pathname;
    orderBy = $page.url.searchParams.get("orderBy") || "created_at";
    order = $page.url.searchParams.get("order") === "desc" ? "desc" : "asc";
    currentPage = $page.url.searchParams.get("page") || "1";
    sortData();
  }

  let data: { results: any[]; start: number; end: number; total: number } = {
    results: rows,
    start: 1,
    end: Math.min(25, rows.length),
    total: rows.length,
  };

  function edit(row: object) {
    formData = row;
    drawer.open = true;
  }
  
  function add() {
    formData = null;
    drawer.open = true;
  }

  function sortData() {
    data.results = rows.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    data.total = data.results.length;
  }

  function onPreviousClick() {
    let newPage = parseInt(currentPage) - 1 + "";
    goto(
      `${baseUrl}` +
        encodeSearchParams({
          orderBy: orderBy,
          order: order,
          page: newPage,
        }),
    );
  }

  function onNextClick() {
    let newPage = parseInt(currentPage) + 1 + "";
    goto(
      `${baseUrl}` +
        encodeSearchParams({
          orderBy: orderBy,
          order: order,
          page: newPage,
        }),
    );
  }

  function onPageClick(page: number) {
    let newPage = page + "";
    goto(
      `${baseUrl}` +
        encodeSearchParams({
          orderBy: orderBy,
          order: order,
          page: newPage,
        }),
    );
  }

  function onColumnHeaderClick(column: string) {
    goto(
      `${baseUrl}` +
        encodeSearchParams({
          orderBy: column,
          order: column === orderBy && order === "asc" ? "desc" : "asc",
          page: currentPage,
        }),
    );
  }

</script>

<svelte:component
  this={FormComponent}
  title={formTitle}
  action={formAction}
  open={drawer.open}
  data={formData}
/>
<Card bordered={false} elevation="sm" class="p-2" style="height: calc(100% - 64px)">
  <Card.Header
    slot="header"
    class="font-semibold text-lg flex justify-between items-center py-3"
  >
    {title}
    <Button slot="extra" type="primary" on:click={() => (add())}>
      <Icon src={Plus} class="h-5 w-5" />
      New Item
    </Button>
  </Card.Header>
  <Card.Content
    slot="content"
    class="p-0 sm:p-0"
    style="height: calc(100% - 64px);"
  >
    <Table class="rounded-md overflow-hidden h-full shadow-sm" {columns}>
      <Table.Header slot="header" {order} {orderBy} {onColumnHeaderClick}  class="bg-primary !text-light-50"/>
      <Table.Body slot="body">
        {#each data.results as item}
          <Table.Body.Row id={item.id} on:click={() => edit(item)}>
            {#each Object.entries(item) as [key, value], i}
              <Table.Body.Row.Cell column={i} class="text-center"
                >{value}</Table.Body.Row.Cell
              >
            {/each}
          </Table.Body.Row>
        {/each}
      </Table.Body>
      <Table.Footer slot="footer">
        <Pagination
          start={data.start}
          end={data.end}
          total={data.total}
          currentPage={parseInt(currentPage)}
          {onPreviousClick}
          {onNextClick}
          {onPageClick}
        />
      </Table.Footer>
    </Table>
  </Card.Content>
</Card>

<style>
  :global(thead > tr.table-row) {
    --tw-shadow-color: 0, 0, 0;
    --tw-shadow: 0 0px 0px 0 rgba(var(--tw-shadow-color), 0.05);
    -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  :global(.stwui-table-header button){
    color: #eee;
  }

  :global(.stwui-table-header, .stwui-table-body-row-cell){
    text-align: center !important;
  }
</style>
