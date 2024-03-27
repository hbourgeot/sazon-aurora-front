<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import type { User } from '$lib/types';
	import { ArrowUpDown } from '@steeze-ui/remix-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import ProductsFormDrawer from './ProvidersFormDrawer.svelte';
	import TableActions from './TableActions.svelte';

	export let data: User[];

	const products = writable(data);
	$: $products = data;

	const table = createTable(products, {
		page: addPagination({initialPageSize: 7}),
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
			accessor: 'document',
			header: 'Documento de Identidad',
		}),
		table.column({
      accessor: 'name',
			header: 'Nombre'
		}),
		table.column({
      accessor: 'email',
			header: 'Correo Electrónico',
		}),
		table.column({
      accessor: (row) => row,
			header: '',
			cell: ({ value }) => {
        return createRender(TableActions, { data: value, tipo: 'customer'});
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

<div class="max-w-full w-full lg:w-auto">
  <h2 class="text-xl lg:text-2xl font-light my-2">Lista de clientes</h2>
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
                    {#if ["id"].includes(cell.id)}
                    <div class="gradient">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
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
