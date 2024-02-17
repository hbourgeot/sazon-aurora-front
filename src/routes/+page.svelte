<script lang="ts">
    import {Button, Card, Media} from "stwui";
    import {onMount} from "svelte";
    import mapbox from "mapbox-gl";
    import {browser} from "$app/environment";
    import mapboxgl from "mapbox-gl";
    import {burger, cachapa, cesar} from "$lib/assets";

    mapbox.accessToken =
        "pk.eyJ1IjoiaGJvdXJnZW90IiwiYSI6ImNscGVrYzNleDBlaTAyanF6bmNkeGFvbXQifQ.ccNVKHCjOECTaRyVmYiSfQ";

    const ourSpecials = [
        {
            img: burger,
            title: "Hamburguesa",
            desc: "Rica hamburguesa con el sabor a una de McDonald's",
        },
        {
            img: cachapa,
            title: "Cachapa",
            desc: "¿Por qué una cachapa tendría descripción?",
        },
        {
            img: cesar,
            title: "Ensalada César",
            desc: "Una exquisita ensalada (incluye pollo y pan, no somos caimanes)",
        },
    ];

    let textos = ["Descubre", "Prueba", "Comparte"];
    let indiceActual = 0;
    let textoActual = textos[indiceActual];

    onMount(() => {
        const intervalo = setInterval(() => {
            indiceActual = (indiceActual + 1) % textos.length;
            textoActual = textos[indiceActual];
        }, 2500); // Cambia cada 3 segundos

        if (browser) {
            const map = new mapbox.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-67.5889635927875, 10.266184416869562],
                zoom: 15,
            });

            const popup = new mapbox.Popup({
                className: "mapbox-popup",
                closeOnMove: true,
                closeButton: true,
                maxWidth: "400px",
                focusAfterOpen: true,
            })
                .setHTML(
                    "Hola, si ves esto, sígueme en <a href='https://github.com/hbourgeot' class='link'>github</a>"
                )
                .addTo(map);

            map.addControl(new mapboxgl.NavigationControl());
            const marker = new mapbox.Marker({color: "red"})
                .setPopup(popup)
                .on("click", () => {
                    marker.togglePopup();
                })
                .setLngLat([-67.5889635927875, 10.266184416869562])
                .addTo(map);
        }

        return () => {
            clearInterval(intervalo);
        };
    });
</script>

<main class="w-full h-screen">
    <header class="flex justify-evenly items-center mx-auto h-full">
        <section class="h-full w-screen grid place-content-center">
            <h1 class="text-3xl lg:text-5xl font-bold my-2">El sazón de <span class="gradient text-6xl font-extrabold">Aurora</span></h1>
            <h2 class="text-xl lg:text-3xl max-w-[27ch] my-2 text-center lg:text-left">
                <span class="gradient text-2xl lg:text-4xl">{textoActual}</span>
                todo el sazón que te podemos ofrecer
            </h2>
            <div class="flex justify-between w-fit gap-x-4 py-2">
                <Button type="primary">Ordena ahora</Button>
                <Button type="default">Ver menú</Button>
            </div>
        </section>
        <div class="lg:w-2/5 hidden lg:block"></div>
    </header>
    <section class="!relative w-full h-calc">
        <div class="full-screen-map" id="map"></div>
        <h3 class="map-text text-2xl lg:text-3xl text-center font-bold">
            ¿Dónde puedes ubicarnos?
        </h3>
    </section>
    <!-- Sección de Menú Destacado -->
    <section class="py-8">
        <div class="container mx-auto px-4">
            <article class="max-w-5xl mx-auto text-center">
                <h2 class="font-bold text-2xl lg:text-4xl mb-6 gradient">
                    Nuestras especialidades
                </h2>
                <div class="grid grid-cols-3 gap-4">
                    {#each ourSpecials as special}
                        <Card class="max-w-[500px] m-auto" hoverable>
                            <Card.Cover slot="cover">
                                <img
                                        src="{special.img}"
                                        alt="cover"
                                        class="object-cover object-center w-full h-[300px] aspect-1 p-3"
                                />
                            </Card.Cover>
                            <Card.Content slot="content">
                                <Media>
                                    <Media.Content>
                                        <Media.Content.Title>{special.title}</Media.Content.Title>
                                        <Media.Content.Description
                                        >{special.desc}</Media.Content.Description
                                        >
                                    </Media.Content>
                                </Media>
                            </Card.Content>
                        </Card>
                    {/each}
                </div>
            </article>
        </div>
    </section>

    <!-- Sección de Horario de Atención e Información de Contacto -->
    <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap -mx-4 text-center justify-center">
                <!-- Horario de atención -->
                <div class="w-full md:w-1/2 px-4 mb-4">
                    <article>
                        <h2 class="font-bold text-2xl mb-3 gradient">
                            Horario de Atención
                        </h2>
                        <p class="text-gray-600">Lunes a Viernes: 9am - 9pm</p>
                        <p class="text-gray-600">Sábados: 10am - 8pm</p>
                        <p class="text-gray-600">Domingos: Cerrado</p>
                    </article>
                </div>

                <!-- Información de contacto -->
                <div class="w-full md:w-1/2 px-4">
                    <address>
                        <h2 class="font-bold text-2xl mb-3 gradient">
                            Información de Contacto
                        </h2>
                        <p class="text-gray-600">Teléfono: +1 234 567 8900</p>
                        <p class="text-gray-600">Email: contacto@turestaurante.com</p>
                        <p class="text-gray-600">
                            Dirección: Calle Ficticia 123, Ciudad, País
                        </p>
                    </address>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
    header {
        background-image: url("/hero.webp");
        background-position: center center;
        background-size: cover;
    }

    header > section {
        background: linear-gradient(90deg, #FFF7F7 50%, transparent);
    }

    .h-calc {
        height: 41vh;
    }

    :global(.full-screen-map) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border: none;
        z-index: 0;
    }

    :global(.map-text) {
        position: absolute;
        top: 10%; /* Central verticalmente */
        left: 50%; /* Central horizontalmente */
        transform: translate(-50%, -50%); /* Ajusta el centrado exacto */
        z-index: 10; /* Asegúrate de que el texto esté sobre el mapa */
        color: #fff; /* Cambia el color según tu diseño */
        text-shadow: 0 2px 4px rgb(0, 0, 0); /* Sombra de texto para mejorar legibilidad */
    }

    @media screen and (max-width: 1023px) {
        header {
            background-position: center center;
        }

        header > section {
            background: #eeeeee88;
        }
    }

    :global(.mapbox-popup) {
        max-width: 400px;
        font: 12/20px "Raleway Variable", sans-serif;
    }

    :global(.link) {
        color: #55f;
        text-decoration: underline;
        font-weight: 700;
    }
</style>
