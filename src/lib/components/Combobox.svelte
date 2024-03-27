<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	let className: string;
	export let items: { label: string; value: string | number | boolean }[] = [];
	export let value: string | number | boolean = '';
	export {className as class};
	let open = false;

	$: selectedValue = items.find((f) => f.value === value)?.label ?? 'Select an item...';
	$: value = value;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function closeAndFocus(
		currentValue: string | number | boolean,
		ids: { content: string; trigger: string }
	) {
		value = currentValue;
		closeAndFocusTrigger(ids.trigger);
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-full justify-between ${className}"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search item..." />
			<Command.Empty>No item found.</Command.Empty>
			<Command.Group>
				{#each items as item}
					<Command.Item
						value={item.value.toString()}
						onSelect={(currentValue) => closeAndFocus(currentValue, ids)}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== item.value && 'text-transparent')} />
						{item.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
