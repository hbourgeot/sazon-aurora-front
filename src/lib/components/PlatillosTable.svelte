<script lang="ts">
	import type { Food } from '$lib/types';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import TableActions from './TableActions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from '@steeze-ui/remix-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let data: (Food & { products: string })[];

	const table = createTable(readable(data), {
		page: addPagination(),
    sort: addSortBy()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID',
      plugins: {
        sort: {
          disable: true
        }
      }
		}),
		table.column({
      accessor: 'name',
			header: 'Nombre'
		}),
		table.column({
      accessor: 'description',
			header: 'Descripción'
		}),
		table.column({
      accessor: 'price',
			header: 'Precio',
			cell: ({ value }) => {
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
					currency: 'USD'
				}).format(value);
				return formatted;
			}
		}),
		table.column({
      accessor: 'created_at',
			header: 'Creado',
      plugins: {
        sort: {
          disable: true
        }
      }
		}),
		table.column({
      accessor: 'products',
			header: 'Productos',
      plugins: {
        sort: {
          disable: true
        }
      }
		}),
		table.column({
      accessor: (row) => row,
			header: '',
			cell: ({ value }) => {
        return createRender(TableActions, { data: value, tipo: 'food'});
			},
      plugins: {
        sort: {
          disable: true
        }
      }
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div>
	<div class="w-full rounded-md border !bg-white">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
            <Subscribe
              attrs={cell.attrs()}
              let:attrs
              props={cell.props()}
              let:props
            >
              <Table.Head {...attrs}>
                {#if ["name", "description", "price"].includes(cell.id)}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <Icon src={ArrowUpDown} class={"ml-2 h-4 w-4"} />
                  </Button>
                {:else}
                  <Render of={cell.render()} />
                {/if}
              </Table.Head>
            </Subscribe>
          {/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Anterior</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Siguiente</Button
		>
	</div>
</div>
