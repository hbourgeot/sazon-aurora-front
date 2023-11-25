<script lang="ts">
  import { Button } from "stwui";
import { onMount } from "svelte";

  let textos = ["Descubre", "Prueba", "Comparte"];
  let indiceActual = 0;
  let textoActual = textos[indiceActual];

  onMount(() => {
    const intervalo = setInterval(() => {
      indiceActual = (indiceActual + 1) % textos.length;
      textoActual = textos[indiceActual];
    }, 2500); // Cambia cada 3 segundos

    return () => {
      clearInterval(intervalo);
    };
  });
</script>

<main class="w-full">
  <header class="flex justify-evenly items-center h-screen mx-auto">
    <section class="h-full w-screen grid place-content-center">
      <h2 class="text-2xl lg:text-4xl max-w-[27ch] text-center lg:text-left">
        <span class="gradient text-3xl lg:text-5xl">{textoActual}</span>
        todo el sazón que te podemos ofrecer
      </h2>
      <div class="flex justify-between w-fit gap-x-4 py-2">
        <Button type="primary">Ordena ahora</Button>
        <Button type="default">Ver menú</Button>
      </div>
    </section>
    <div class="lg:w-2/5 hidden lg:block"></div>
  </header>
  <section class="p-16">Hola</section>
</main>

<style>
  header {
    background-image: url("/hero.webp");
    background-position: center center;
    background-size: cover;
  }

  header > section {
    background: linear-gradient(90deg, white 50%, transparent);
  }

  @media screen and (max-width: 1023px) {
    header {
      background-position: center center;
    }
    header > section {
      background: #eeeeee88;
    }
  }
</style>
