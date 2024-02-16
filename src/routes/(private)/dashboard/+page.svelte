<script lang="ts">
  import { ChevronRight, Heart, Inbox, Truck, User } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Button, Card, Statistic } from "stwui";
  import { formatNumber } from "stwui/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="w-full p-3 h-full flex flex-col justify-center items-center">
  <h3 class="text-3xl px-2">Panel de acciones</h3>
  <div
    class="w-full flex md:flex-row flex-col justify-center items-center p-2 mt-4 gap-5"
  >
  <section class="grid md:grid-cols-2 gap-2 w-3/5">
      <Statistic class="w-full relative h-fit row-span-2" bordered="{false}">
        <Statistic.Title slot="title">Ventas totales</Statistic.Title>
        <Icon
          src={Heart}
          theme="solid"
          class="h-10 w-10 text-primary absolute top-4 right-4" />
        <Statistic.Value class="text-primary" slot="value">
          {formatNumber(data.ventas, {
            style: "decimal",
            notation: "compact",
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}
        </Statistic.Value>
        <img src={data.ventasImg} alt="bar" class="w-full h-full p-1" />
        <Button
          type="link"
          shape="rounded"
          href="/dashboard/platillos"
          class="w-full flex justify-end gap-x-1">
          Ver platillos <Icon src={ChevronRight} class="h-4 w-4" />
        </Button>
      </Statistic>
      <Statistic class="w-full relative" bordered={false}>
        <Statistic.Title slot="title">Clientes registrados</Statistic.Title>
        <Icon
          src={User}
          theme="solid"
          class="h-10 w-10 text-primary absolute top-4 right-4" />
        <Statistic.Value class="text-primary" slot="value">
          {formatNumber(data.clientesTotales, {
            style: "decimal",
            notation: "compact",
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}
        </Statistic.Value>
        <Button
          type="link"
          shape="rounded"
          href="/dashboard/clientes"
          class="w-full flex justify-end gap-x-1">
          Ver clientes <Icon src={ChevronRight} class="h-4 w-4" />
        </Button>
      </Statistic>
      <Statistic class="w-full relative row-span-2 h-fit" bordered={false}>
        <Statistic.Title slot="title">Productos en almacén</Statistic.Title>
        <Icon
          src={Inbox}
          theme="solid"
          class="h-10 w-10 text-primary absolute top-4 right-4" />
        <Statistic.Value class="text-primary" slot="value">
          {formatNumber(data.productosTotales, {
            style: "decimal",
            notation: "compact",
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}
        </Statistic.Value>
        <img src={data.productosImg} alt="bar" class="w-full h-full p-1" />
        <Button
          type="link"
          shape="rounded"
          href="/dashboard/productos"
          class="w-full flex justify-end gap-x-1">
          Ver productos <Icon src={ChevronRight} class="h-4 w-4" />
        </Button>
      </Statistic>
      <Statistic class="w-full relative" bordered={false}>
        <Statistic.Title slot="title">Proveedores registrados</Statistic.Title>
        <Icon
          src={Truck}
          theme="solid"
          class="h-10 w-10 text-primary absolute top-4 right-4" />
        <Statistic.Value class="text-primary" slot="value">
          {formatNumber(data.proveedoresTotales, {
            style: "decimal",
            notation: "compact",
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          })}
        </Statistic.Value>
        <Button
          type="link"
          shape="rounded"
          href="/dashboard/proveedores"
          class="w-full flex justify-end gap-x-1">
          Ver proveedores <Icon src={ChevronRight} class="h-4 w-4" />
        </Button>
      </Statistic>
    </section>
    <section class="w-2/5 grid md:grid-cols-2 gap-x-2 gap-y-6">
      <h3 class="text-3xl col-span-2 text-center">Acciones rápidas</h3>
      <a href="/dashboard/menu">
        <Card hoverable bordered={false}>
          <Card.Content
            slot="content"
            class="flex gap-x-2 items-center w-full justify-between text-xl">
            Menú <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card>
      </a>
      <a href="/dashboard/menu">
        <Card hoverable bordered={false}>
          <Card.Content
            slot="content"
            class="flex gap-x-2 items-center w-full justify-between text-xl">
            Pedidos <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card>
      </a>
      <a href="/dashboard/menu" class="col-span-2">
        <Card hoverable bordered={false}>
          <Card.Content
            slot="content"
            class="flex gap-x-2 items-center w-full justify-between text-xl">
            Calificaciones de clientes <Icon
              src={ChevronRight}
              class="h-4 w-4" />
          </Card.Content>
        </Card>
      </a>
      <a href="/dashboard/menu">
        <Card hoverable bordered={false}>
          <Card.Content
            slot="content"
            class="flex gap-x-2 items-center w-full justify-between text-xl">
            Metodos de pago <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card>
      </a>
      <a href="/dashboard/menu">
        <Card hoverable bordered={false}>
          <Card.Content
            slot="content"
            class="flex gap-x-2 items-center w-full justify-between text-xl">
            Personal <Icon src={ChevronRight} class="h-4 w-4" />
          </Card.Content>
        </Card>
      </a>
    </section>
  </div>
</main>