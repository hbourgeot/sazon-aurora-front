
<script lang="ts">
  import { breadcrumbs } from '$lib/store/breadcrumbs.store';
  import type { Crumb } from '$lib/types';
  import { ChevronRight } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
	import { Breadcrumbs } from 'stwui';

  export let className: string = "";
	const home = "svg-path";
</script>

<Breadcrumbs type="solid" class="{className}">
	{#each $breadcrumbs as crumb}
		{#if crumb.icon && crumb.label}
			<Breadcrumbs.Crumb href={crumb.href}>
				<Breadcrumbs.Crumb.Icon slot="icon" data={crumb.icon} />
        <div slot="divider">
          <Icon src={ChevronRight} class="h-9 w-9"/>
        </div>
				<Breadcrumbs.Crumb.Label slot="label">{crumb.label}</Breadcrumbs.Crumb.Label>
			</Breadcrumbs.Crumb>
		{:else if crumb.icon}
			<Breadcrumbs.Crumb href={crumb.href}>
        <div slot="divider">
          <Icon src={ChevronRight} class="h-9 w-9"/>
        </div>
				<Breadcrumbs.Crumb.Icon slot="icon" data={crumb.icon} />
			</Breadcrumbs.Crumb>
		{:else}
			<Breadcrumbs.Crumb href={crumb.href}>
        <div slot="divider">
          <Icon src={ChevronRight} class="h-9 w-9"/>
        </div>
				<Breadcrumbs.Crumb.Label slot="label">{crumb.label}</Breadcrumbs.Crumb.Label>
			</Breadcrumbs.Crumb>
		{/if}
	{/each}
</Breadcrumbs>