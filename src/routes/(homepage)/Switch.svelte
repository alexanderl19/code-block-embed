<script lang="ts">
	import { Switch, Label } from 'bits-ui';

	export let name: string | undefined = undefined;
	export let checked: boolean;
	export let label: string;
	export let description: string | undefined = undefined;
</script>

<Label.Root class="font-medium flex gap-5 items-center">
	<div class="shrink-0 w20">
		<Switch.Root
			{name}
			bind:checked
			class="p1 m-auto rounded-full border-none flex shrink-0 w14 items-center transition-colors data-[state=checked]:bg-stone-9 data-[state=unchecked]:bg-stone-2 ring-focus-visible"
		>
			<Switch.Thumb
				class="block bg-white rounded-full shrink-0 size-7 pointer-events-none transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
			/>
		</Switch.Root>
	</div>
	<div>
		{label}
		{#if description}
			<p class="my0 mt2 text-stone-6 font-normal">{description}</p>
		{/if}
	</div>
</Label.Root>
