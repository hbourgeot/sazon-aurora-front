<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { empty } from "$lib/assets";
  import ProductCard from "$lib/components/Product.svelte";
  import { addToCart } from "$lib/store/cart.store";
  import type { FoodProduct } from "$lib/types";
  import {
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
  } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let recomendaciones: FoodProduct[] = [];

  let selectedProduct: FoodProduct | null = null;

  let x = 0;
  let y = 0;
  let imageUrl = $page.data.food.images[0] ?? "";
  let zoomLevel = 1.5;
  let lensVisible = false;

  $: if ($page.data && $page.data.food) {
    if (selectedProduct?.id !== $page.data.food?.id) {
      actualImg = 0;
      imageUrl = $page.data.food.images[0] ?? "";
    }

    selectedProduct = $page.data.food;

    displayImgs = selectedProduct?.images ?? [];
  }

  let actualImg: number = 0;
  let displayImgs: any[] = [];

  const handleSubmit = async () => {
    addToCart(selectedProduct!);
  };

  function showImg(v: number) {
    if (selectedProduct?.images) {
      if (!(v < 0) && !(v > selectedProduct.images.length - 1)) {
        actualImg = v;
        imageUrl = selectedProduct.images[v];
      }
    }
  }



  function isMediumScreen() {
    return window.innerWidth >= 768;
  }

  onMount(() => {
    const image = document.querySelector(".image");
    const lens = document.querySelector(".lens");

    image!.addEventListener("mousemove", (e) => {
      if (!isMediumScreen()) return;

      const bounds = image!.getBoundingClientRect();
      x = (e as MouseEvent).clientX - bounds.left;
      y = (e as MouseEvent).clientY - bounds.top;
      (lens as HTMLElement).style.backgroundPosition = `-${x * zoomLevel}px -${
        y * zoomLevel
      }px`;
      lensVisible = true;
    });

    image!.addEventListener("mouseout", () => {
      if (!isMediumScreen()) return;

      lensVisible = false;
    });
  });

</script>

<main class="min-h-full ">
  <!--Product details-->
  <section>
    <section
      class="overflow-hidden !min-h-screen !h-fit flex flex-col justify-center mt-10 rounded-lg shadow-lg drop-shadow-lg">
      <div class="p-4 mx-auto w-full">
        <div
          class="mx-auto lg:px-5 w-full min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-x-10 items-center justify-center md:w-4/5">
          <a
              class="absolute top-[4%] left-[15%] p-3 rounded-full bg-red-400 flex gap-x-3 shadow-xl hover:bg-red-600 hover:text-white transition-colors"
              href="/menu">
              <Icon class="h-5 w-5" src={ChevronLeft} /> Volver atrás
            </a>
          <figure
            class="mx-auto lg:ml-auto flex lg:w-1/2 h-[450px] rounded-lg justify-center">
            <div class="relative">
              <!-- go back button href="/menu" -->
              {#if selectedProduct?.images}
                <img
                  loading="eager"
                  alt="producto"
                  class="h-full w-full object-scale-down mb-3 shadow-xl image"
                  src={selectedProduct?.images[actualImg] ?? empty}
                  transition:slide={{ axis: "x" }} />
              {:else}
                <img
                  loading="eager"
                  alt="producto"
                  class="hh-full w-full object-scale-down mb-3 shadow-xl image"
                  src={empty}
                  transition:slide={{ axis: "x" }} />
              {/if}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <nav class="absolute top-2/5 w-full flex justify-between">
                {#if actualImg !== 0}
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <figure
                    class="self-center <sm:hidden chevron rounded-full p-3 mr-auto cursor-pointer"
                    on:click={(e) => showImg(actualImg - 1)}
                  >
                    <Icon class="h-5 w-5 text-white" src={ChevronLeft} />
                  </figure>
                {/if}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                {#if !(actualImg >= displayImgs.length - 1)}
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <figure
                    class="self-center <sm:hidden chevron rounded-full p-3 relative z-40 ml-auto cursor-pointer"
                    on:click={(e) => showImg(actualImg + 1)}
                  >
                    <Icon class="h-5 w-5 text-white" src={ChevronRight} />
                  </figure>
                {/if}
              </nav>
            </div>
          </figure>

          <p class="text-center flex mx-auto justify-center sm:hidden">
            {#each displayImgs as _, v}
              {#if displayImgs.length > 1}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span
                  on:click={() => showImg(v)}
                  on:keydown={() => showImg(v)}
                  class="cursor-pointer h-10 border-navy rounded-3xl p-1">
                  <span class="border-navy rounded-3xl p-1">
                    <svg
                      width="24"
                      class={`border-navy rounded-3xl p-1 ${
                        v == actualImg ? "border-2" : ""
                      }`}
                      height="24"
                      viewBox="-4 -4 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="8"
                        cy="8"
                        r="10"
                        fill={v == actualImg ? "navy" : "#C4C4C4"} />
                    </svg>
                  </span>
                </span>
              {/if}
            {/each}
          </p>

          <div
            class="flex flex-col mr-auto items-start justify-between mx-auto lg:w-1/2 lg:pl-10 lg:mt-8 overflow-x-hidden overflow-ellipsis">
            <div
              class={`lens rounded-md absolute shadow-2xl left-[52%] top-[10%] w-[400px] h-[400px] border cursor-crosshair overflow-hidden bg-no-repeat ${
                lensVisible && imageUrl ? "" : "hidden"
              }`}
              style="background-image: url({imageUrl}); background-size: {zoomLevel *
                200}%;">
            </div>
            <div>
              <h1 class="gradient text-3xl lg:text-5xl mb-4">
                {selectedProduct?.name}
              </h1>
              <p class="leading-relaxed text-base lg:text-xl font-light text-gray-600 mb-6 max-w-md my-2">
                {selectedProduct?.description}
              </p>

              <p class="leading-relaxed text-lg lg:text-2xl font-medium text-gray-600 mb-6 max-w-md my-2">
                {selectedProduct?.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>

              <div class="flex flex-col">
                <div
                  class="flex flex-col gap-y-5 my-5 items-center justify-center">
                  <form on:submit={handleSubmit} class="flex flex-col gap-3">
                    <button
                      type="submit"
                      class="bg-primary  rounded-xl text-white hover:bg-primary-hover justify-center flex py-3 w-[240px] sm:w-[280px] gap-3">
                      <Icon class="h-5 w-5" src={ShoppingCart} />
                      <p>Agregar al carrito</p>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {#if recomendaciones?.length}
          <section class="w-9/10 mx-auto my-5">
            <h1 class="text-black text-2xl mb-4 ml-12">
              Productos recomendados
            </h1>

            <div class="products my-8 px-8 grid justify-center gap-8 w-full">
              {#each recomendaciones as item}
                <ProductCard
                  description={item.description}
                  food={item}
                  image={item?.images ? item.images[0] : ""}
                  price={item.price}
                  title={item.name} />
              {/each}
            </div>
          </section>
        {/if}
      </div>
    </section>
  </section>
</main>

<style lang="scss">
  :root {
    --navy: #0a1b48;
  }

  .price-font {
    font-weight: 400;
    font-size: 28px;
    line-height: 35px;
  }

  .search-icon {
    position: absolute;
    bottom: 0.5rem;
    left: 1rem;
  }

  .chevron {
    background: rgba(30, 30, 30, 0.3);
  }

  // summary::marker {
  //   display: none;
  //   font-size: 0;
  // }

  .extra-small {
    @media (min-width: 300px) {
      width: 30%;
    }
  }

  .slid {
    animation: drop-off 500ms;
    transform-origin: top;
  }

  @keyframes drop-off {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  // .product-img img{
  // 	    object-fit: none;
  // }

  /*@media (min-width: 680px) {
      section.bg-white {
        margin-right: 10%;
      }
    }*/

  .no-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-container {
    min-height: 90vh;
    max-height: 90vh;
  }

  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  div.products {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(160px, 350px));
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(1, minmax(160px, 350px));
    }
  }
</style>
