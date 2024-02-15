<script lang="ts">
  import Product from "$lib/components/Product.svelte";
  import { Icon } from "@steeze-ui/svelte-icon";
  import type { PageData } from "./$types";
  import { ShoppingCart } from "@steeze-ui/heroicons";
  import { tooltip } from "stwui/actions";
  import { goto } from "$app/navigation";
  import { cart } from "$lib/store/cart.store";
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";
  export let data: PageData;

  const drawer = { open: true };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      document.title = "Menú del Sazón de Aurora";
    } else {
      document.title = "¡Vuelve! Te extrañamos";
      handleCart();
    }
  };

  const handleCart = async () => {
    if ($cart.products.length > 0) {
      //@ts-ignore
      const user =data?.session?.user?.database?.id;
      //@ts-ignore
      const {error: fetchError, data: existingCart}: {error: any, data: {id: number, created_at: string, user_id: number}} = await data.supa
      ?.from("cart")
      .select("id, created_at, user_id")
      .eq("user_id", user)
      .single();
      
      if (fetchError) {
        console.error(fetchError);
        return;
      }
      
      const cartPayload = existingCart
      ? { id: existingCart.id, user_id: existingCart.user_id, updated_at: new Date().toISOString() }
      : {
          //@ts-ignore
          user_id: user,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        console.log(cartPayload);
        //@ts-ignore
        const { error: upsertError } = await data.supa
        ?.from("cart")
        //@ts-ignore
        .upsert(cartPayload);

      if (upsertError) {
        console.error(upsertError);
        return;
      } 

      let cartItems = $cart.products.map((product) => {
        return {
          id: undefined,
          cart_id: existingCart?.id,
          food_id: product.id,
          quantity: product.amount,
          total_price: product.price * product.amount,
        };
      });

      for (const item of cartItems) {
        //@ts-ignore
        const {error: getError, data: existingItem} = await data.supa?.from("cart_details").select("id").eq("cart_id", existingCart?.id).eq("food_id", item.food_id).maybeSingle();
        if (getError) {
          console.error(getError);
          return;
        }

        if( existingItem) {
          item.id = existingItem.id;
        }

        //@ts-ignore
        const { error: insertError } = await data.supa?.from("cart_details").upsert(item);
        if (insertError) {
          console.error(insertError);
          return;
        }

        console.log("Cart details inserted!");
      }
    }
  };

  onMount(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });
</script>

<Cart open={drawer.open} />
<main class="mx-auto h-full !p-4">
  <button
    class="fixed top-6 right-6 rounded-full h-11 w-11 p-2 flex justify-center items-center {$cart
      .products.length > 0
      ? 'text-white bg-primary'
      : 'text-primary'}"
    on:click={() => (drawer.open = true)}
    use:tooltip={{
      placement: "left",
      content: "Ver tu carrito",
      arrow: true,
      animation: "scale",
      theme: "primary",
    }}>
    <Icon src={ShoppingCart} class="!h-10 !w-10" />
    {#if $cart.products.length > 0}
      <span
        class="absolute -top-1 -right-1 bg-hover text-white rounded-full h-5 w-5 flex justify-center items-center font-sans">
        {$cart.products.length}
      </span>
    {/if}
  </button>
  <h1 class="p-4 my-5 lg:my-10">
    Menú del Sazón de <span class="gradient">Aurora</span>
  </h1>
  <section class="gridify">
    {#each data.foods as food}
      <Product
        {food}
        title={food.name}
        description={food?.description ?? ""}
        price={food.price}
        image={food.image} />
    {/each}
  </section>
</main>

<style>
  main {
    padding: 1rem;
    width: 90%;
    margin: 0 auto;
    max-width: 1500px;
  }

  .gridify {
    width: 100%;
    max-width: 1500px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
</style>
