<script lang="ts">
  import Product from "$lib/components/Product.svelte";
  import { Icon } from "@steeze-ui/svelte-icon";
  import type { PageData } from "./$types";
  import { ShoppingCart } from "@steeze-ui/heroicons";
  import { goto } from "$app/navigation";
  import { cart } from "$lib/store/cart.store";
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";
  import type { CartDetails, FoodProduct } from "$lib/types";
  export let data: PageData;

  const drawer = { open: false };

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
      .maybeSingle();
      
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

  const getCart = async () => {
    //@ts-ignore
    const user = data?.session?.user?.database?.id;
    console.log(user);
    //@ts-ignore
    const { error, data: cart} = await data.supa?.from("cart").select("*").eq("user_id", user).maybeSingle();
    if (error) {
      console.error(error);
      return;
    }
    console.log(cart);

    if(!cart) {
      return;
    }
    //@ts-ignore
    const { error: detailsError, data: cartDetails } = await data.supa?.from("cart_details").select("*, foods(id, name, description)").eq("cart_id", cart.id);
    if (detailsError) {
      console.error(detailsError);
      return;
    }

    console.log(cartDetails);

    let products = cartDetails.map((detail: CartDetails) => {
      return {
        id: detail.food_id,
        amount: detail.quantity,
        price: detail.total_price,
        //@ts-ignore
        name: detail.foods.name,
        //@ts-ignore
        description: detail.foods.description,
        image: data.foods.find((food) => food.id === detail.food_id)?.image,
      };
    });

    $cart.products = products;
    $cart.totalAmount = products.reduce((acc: number, product: FoodProduct) => acc + product.price, 0);
  };

  onMount(() => {
    getCart();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  const generarInvoice = async () => {
    await handleCart();
    //@ts-ignore
    const user = data?.session?.user?.database?.id;

    //@ts-ignore
    const {error, data: [newInvoice]} = await data.supa?.from("invoices").insert({
      created_at: new Date().toISOString(),
      user_id: user,
      total: $cart.totalAmount,
      status: "PAGADO"
    }).select();

    console.log(newInvoice);

    if (error) {
      console.error(error);
      return;
    }

    for (const product of $cart.products) {
      const invoicePayload = {
        invoice_id: newInvoice.id,
        food_id: product.id,
        quantity: product.amount,
        price: product.price * product.amount,
      };

      try{
      //@ts-ignore
      const { error: insertError } = await data.supa?.from("invoice_details").insert(invoicePayload);
      if (insertError) {
        console.error(insertError);
        return;
      }
      } catch (error) {
        console.error(error);
      }
    }

    console.log("Invoice inserted!");

    $cart.products = [];
    drawer.open = false;

    //@ts-ignore
    await data.supa?.from("cart").delete().eq("user_id", user);
  };
</script>

<main class="mx-auto h-full !p-4">
  <Cart on:pagar={generarInvoice} />
  <h1 class="p-4 my-5 lg:my-10 text-2xl lg:text-4xl">
    Menú del Sazón de <span class="gradient font-bold">Aurora</span>
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
