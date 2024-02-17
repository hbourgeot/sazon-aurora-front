<script lang="ts">
  import { goto } from "$app/navigation";
  import { empty } from "$lib/assets";
  import { addToCart } from "$lib/store/cart.store";
  import type { FoodProduct } from "$lib/types";
  import { Plus } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Card } from "stwui";
  import { tooltip } from 'stwui/actions';
  import { formatNumber } from "stwui/utils";

  export let title = "Product Title";
  export let description = "Product Description";
  export let price = 0.0;
  export let image = empty;
  export let food: FoodProduct = {} as FoodProduct;
</script>

<Card hoverable bordered={false} elevation="lg" class="w-full">
  <Card.Header on:click={() => goto(`/menu/platillo/${food.id}`)}
    slot="header"
    class="gradient text-3xl font-extrabold text-center  flex items-center justify-center">
    {title}
  </Card.Header>
  <Card.Cover slot="cover"  on:click={() => goto(`/menu/platillo/${food.id}`)}>
    <img
      src={image}
      alt="cover"
      class="object-cover object-top max-w-[600px] w-full h-[180px] aspect-1 p-3" />
  </Card.Cover>
  <Card.Content slot="content" class="py-2 px-1 truncate">
    <p class="truncate font-semibold">{description}</p>
  </Card.Content>
  <Card.Footer slot="footer" class="flex justify-between items-center">
    <span class="font-light text-2xl p-2">
      {formatNumber(price, {
        style: "currency",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}
    </span>
    <button class="!font-bold text-primary rounded-full hover:text-white hover:bg-primary" use:tooltip={{
      placement: "bottom",
      content: 'Áñadir al carrito',
      arrow: true,
      animation: "scale",
      theme: "primary",
    }} on:click={() => addToCart(food)}
    >
      <Icon src={Plus} theme="mini" class="!h-9 !w-9 border-[4px] border-primary rounded-full" />
    </button>
  </Card.Footer>
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
