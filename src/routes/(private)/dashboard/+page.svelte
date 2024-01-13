<script lang="ts">
    import type {PageData} from './$types';
    import {Statistic} from "stwui";
    import {formatNumber} from "stwui/utils";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Heart, Inbox, Truck, User} from "@steeze-ui/heroicons";

    export let data: PageData;

    console.log(data.session?.user?.user_metadata)

</script>
<div class="w-full flex justify-evenly items-center">
    <section class="grid md:grid-cols-2 gap-2 w-1/2">
        <Statistic class="w-full relative">
            <Statistic.Title slot="title">Ventas totales</Statistic.Title>
            <Icon src="{Heart}" theme="solid" class="h-10 w-10 text-primary absolute top-2 right-2"/>
            <Statistic.Value class="text-primary" slot="value">
                {formatNumber(25660000, {
                    style: 'decimal',
                    notation: 'compact',
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                })}
            </Statistic.Value>
        </Statistic>
        <Statistic class="w-full relative">
            <Statistic.Title slot="title">Clientes satisfechos</Statistic.Title>
            <Icon src="{User}" theme="solid" class="h-10 w-10 text-primary absolute top-2 right-2"/>
            <Statistic.Value class="text-primary" slot="value">
                {formatNumber(23548, {
                    style: 'decimal',
                    notation: 'compact',
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                })}
            </Statistic.Value>
            <Statistic.Comparison slot="comparison">
                <Statistic.Comparison.Value slot="value">
                    Último año: {formatNumber(10293, {
                    style: 'decimal',
                    notation: 'compact',
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                })}
                </Statistic.Comparison.Value>
            </Statistic.Comparison>
        </Statistic>
        <Statistic class="w-full relative">
            <Statistic.Title slot="title">Productos en almacén</Statistic.Title>
            <Icon src="{Inbox}" theme="solid" class="h-10 w-10 text-primary absolute top-2 right-2"/>
            <Statistic.Value class="text-primary" slot="value">
                {formatNumber(248394, {
                    style: 'decimal',
                    notation: 'compact',
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                })}
            </Statistic.Value>
        </Statistic>
        <Statistic class="w-full relative">
            <Statistic.Title slot="title">Proveedores en camino</Statistic.Title>
            <Icon src="{Truck}" theme="solid" class="h-10 w-10 text-primary absolute top-2 right-2"/>
            <Statistic.Value class="text-primary" slot="value">
                25
            </Statistic.Value>
        </Statistic>
    </section>
    <h2>Hola, {data.session?.user?.user_metadata.name ?? 'fulanito'}</h2>
</div>
