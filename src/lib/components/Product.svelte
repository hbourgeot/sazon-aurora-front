<script lang="ts">
  import { Card } from "stwui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Cog, PlusCircle } from "@steeze-ui/heroicons";
  import { formatNumber } from "stwui/utils";
  import {empty} from "$lib/assets"

  export let title = "Product Title";
  export let description = "Product Description";
  export let price = 0.0;
  export let image = empty;
</script>

<Card hoverable bordered={false} elevation="lg">
  <Card.Header slot="header" class="flex justify-center items-center text-2xl font-bold">{title}</Card.Header>
  <Card.Cover slot="cover">
    <img
      src={image}
      alt="cover"
      class="object-cover object-top w-full h-[180px] aspect-1 p-3" />
  </Card.Cover>
  <Card.Content slot="content" class="py-2 px-1">
    <h4>Descripción</h4>
    <p class="truncate">{description}</p>
  </Card.Content>
  <Card.Footer slot="footer" class="gradient text-3xl font-extrabold text-center p-2">
    {formatNumber(price, {
      style: "currency",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}
  </Card.Footer>
  <Card.Actions slot="actions">
    <Card.Actions.Action>
      <Icon src={Cog} slot="icon" />
    </Card.Actions.Action>
    <Card.Actions.Action>
      <Icon src={PlusCircle} slot="icon" />
    </Card.Actions.Action>
  </Card.Actions>
</Card>

<style>
  :global(.stwui-card > *) {
    border: none !important;
  }

  :global(.stwui-card-actions-action) {
    border-color: transparent !important;
  }

  :global(.stwui-card-content, .stwui-card-footer, .stwui-card-header) {
    padding: 0.5rem 1rem;
  }
</style>