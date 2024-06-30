<script lang="ts">
	import { Switch, Label } from 'bits-ui';

	export let name: string | undefined = undefined;
	export let checked: boolean;
	export let label: string;
	export let description: string | undefined = undefined;
</script>

<Label.Root class="flex items-center gap-5 font-medium">
	<div class="w20 shrink-0">
		<Switch.Root
			{name}
			bind:checked
			class="m-auto flex p1 w14 shrink-0 items-center rounded-full transition-colors border-none ring-focus-visible data-[state=checked]:bg-stone-9 data-[state=unchecked]:bg-stone-2"
		>
			<Switch.Thumb
				class="pointer-events-none block size-7 shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
			/>
		</Switch.Root>
	</div>
	<div>
		{label}
		{#if description}
			<p class="font-normal my0 mt2 text-stone-6">{description}</p>
		{/if}
	</div>
</Label.Root>
