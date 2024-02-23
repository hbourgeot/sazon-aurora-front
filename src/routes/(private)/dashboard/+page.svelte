<script lang="ts">
  import { ChevronRight, Heart, Inbox, Truck, User } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import * as Card from "$lib/components/ui/card";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/button/button.svelte";

  export let data: PageData;
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center p-3">
	<h3 class="px-2 text-3xl">Panel de acciones</h3>
	<div class="mt-4 flex w-full flex-col items-center justify-center gap-5 p-2 md:flex-row">
		<section class="grid w-3/5 gap-2 md:grid-cols-2">
			<Card.Root class="relative row-span-2 h-fit w-full">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title>Ventas totales</Card.Title>
					<Icon src={Heart} theme="solid" class="h-10 w-10 text-primary" />
				</Card.Header>
				<Card.Content class="text-primary">
					<span class="text-3xl font-bold"
						>{data.ventas}</span
					>
					<img src={data.ventasImg} alt="bar" class="h-full w-full p-1" />
					<Button
						variant="link"
						href="/dashboard/platillos"
						class="flex w-full justify-end gap-x-1"
					>
						Ver platillos <Icon src={ChevronRight} class="h-4 w-4" />
					</Button>
				</Card.Content>
			</Card.Root>
			<Card.Root class="relative w-full">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title>Clientes registrados</Card.Title>
					<Icon src={User} theme="solid" class="absolute right-4 top-4 h-10 w-10 text-primary" />
				</Card.Header>
				<Card.Content class="text-primary">
          <span class="text-3xl font-bold">
            {data.clientesTotales}
          </span>
					<Button variant="link" href="/dashboard/clientes" class="flex w-full justify-end gap-x-1">
						Ver clientes <Icon src={ChevronRight} class="h-4 w-4" />
					</Button>
				</Card.Content>
			</Card.Root>
			<Card.Root class="relative row-span-2 h-fit w-full">
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title>Productos en almacén</Card.Title>
					<Icon src={Inbox} theme="solid" class="absolute right-4 top-4 h-10 w-10 text-primary" />
				</Card.Header>
				<Card.Content class="text-primary">
          <span class="text-3xl font-bold">
					{data.productosTotales}
          </span>
          <img src={data.productosImg} alt="bar" class="h-full w-full p-1" />
          <Button
            variant="link"
            href="/dashboard/productos"
            class="flex w-full justify-end gap-x-1"
            >
            Ver productos <Icon src={ChevronRight} class="h-4 w-4" />
          </Button>
				</Card.Content>
			</Card.Root>
			<Card.Root class="relative w-full">
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title>Proveedores registrados</Card.Title>
				<Icon src={Truck} theme="solid" class="absolute right-4 top-4 h-10 w-10 text-primary" />
        </Card.Header>
				<Card.Content class="text-primary">
          <span class="text-3xl font-bold">
					{data.proveedoresTotales}
          </span>
          <Button
            variant="link"
            href="/dashboard/proveedores"
            class="flex w-full justify-end gap-x-1"
          >
            Ver proveedores <Icon src={ChevronRight} class="h-4 w-4" />
          </Button>
				</Card.Content>
			</Card.Root>
		</section>
		<section class="grid w-2/5 gap-x-2 gap-y-6 md:grid-cols-2">
			<h3 class="col-span-2 text-center text-3xl">Acciones rápidas</h3>
			<a href="/menu">
				<Card.Root>
					<Card.Content class="flex w-full items-center justify-between gap-x-2 !p-5 text-xl">
						Menú <Icon src={ChevronRight} class="h-4 w-4" />
					</Card.Content>
				</Card.Root>
			</a>
			<a href="/dashboard/menu">
        <Card.Root>
          <Card.Content
            class="flex gap-x-2 items-center w-full justify-between text-xl p-5">
            Pedidos <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card.Root>
      </a>
			<a href="/dashboard/menu" class="col-span-2">
        <Card.Root>
          <Card.Content
            
            class="flex gap-x-2 items-center w-full justify-between text-xl p-5">
            Calificaciones de clientes <Icon
              src={ChevronRight}
              class="h-4 w-4" />
          </Card.Content>
        </Card.Root>
      </a>
			 <a href="/dashboard/menu">
        <Card.Root>
          <Card.Content
            
            class="flex gap-x-2 items-center w-full justify-between text-xl p-5">
            Metodos de pago <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card.Root>
      </a>
			<a href="/dashboard/personal" >
				<Card.Root>
					<Card.Content class="flex w-full items-center justify-between gap-x-2 !p-5 text-xl">
						Personal <Icon src={ChevronRight} class="h-4 w-4" />
					</Card.Content>
				</Card.Root>
			</a>
		</section>
	</div>
</main>
