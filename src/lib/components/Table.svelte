<script lang="ts">
  import type { TableColumn } from 'stwui/types';
  import {Card, Button, Table, Pagination} from 'stwui';
  import { createEventDispatcher } from 'svelte';
  import {Icon} from '@steeze-ui/svelte-icon';
  import {Plus} from '@steeze-ui/heroicons';
  import { goto } from '$app/navigation';
  import { encodeSearchParams } from 'stwui/utils';
  import { page } from '$app/stores';
  
  export let columns: TableColumn[];
  export let rows: any[];
  export let title: string;
  
  let order: 'asc' | 'desc';
	let orderBy: string;
  let baseUrl: string;
	let currentPage: string;

	$: {
		baseUrl = $page.url.pathname;
		orderBy = $page.url.searchParams.get('orderBy') || 'created_at';
		order = $page.url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';
		currentPage = $page.url.searchParams.get('page') || '1';
    sortData();
	}

  let data: {results: any[], start: number, end: number, total: number} = {results: rows, start: 0, end: 0, total: 0};

  const dispatch = createEventDispatcher();

  const handleEdit = (id: number) => {
    dispatch('edit', id);
  };

  function sortData() {
    data.results = rows.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  function onPreviousClick() {
		let newPage = parseInt(currentPage) - 1 + '';
		goto(`${baseUrl}` +
			encodeSearchParams({
				orderBy: orderBy,
				order: order,
				page: newPage
			})
		);
	}

	function onNextClick() {
		let newPage = parseInt(currentPage) + 1 + '';
		goto(`${baseUrl}` +
			encodeSearchParams({
				orderBy: orderBy,
				order: order,
				page: newPage
			})
		);
	}

	function onPageClick(page: number) {
		let newPage = page + '';
		goto(`${baseUrl}` +
			encodeSearchParams({
				orderBy: orderBy,
				order: order,
				page: newPage
			})
		);
	}

	function onColumnHeaderClick(column: string) {
		goto(`${baseUrl}` +
			encodeSearchParams({
				orderBy: column,
				order: column === orderBy && order === 'asc' ? 'desc' : 'asc',
				page: currentPage
			})
		);
	}
</script>

<Card bordered={false} class="h-[calc(100vh-14rem)]">
   <Card.Header slot="header" class="font-bold text-lg flex justify-between items-center py-3">
      {title}
      <Button slot="extra" type="primary">
        <Icon src={Plus} class="h-5 w-5"/>
         New Item
      </Button>
   </Card.Header>
   <Card.Content slot="content" class="p-0 sm:p-0" style="height: calc(100% - 64px);">
      <Table class="rounded-md overflow-hidden h-full" {columns}>
         <Table.Header slot="header" {order} {orderBy} {onColumnHeaderClick} />
         <Table.Body slot="body">
            {#each data.results as item}
               <Table.Body.Row id={item.id} on:click={() => handleEdit(item.id)}>
                {#each Object.entries(item) as [key, value], i}
                  <Table.Body.Row.Cell column={i} class="text-center">{value}</Table.Body.Row.Cell>
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