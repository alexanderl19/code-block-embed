<script lang="ts">
	import { GripHorizontal, Trash2, Plus } from 'lucide-svelte';
	import { dragHandleZone, dragHandle, type DndEvent } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	type Item = {
		id: number;
		text: string;
	};
	let idCount = 3;
	let lineGroups = [
		{
			id: 1,
			text: '1-7',
		},
		{
			id: 2,
			text: '8-14',
		},
		{
			id: 3,
			text: '15-21',
		},
	] as Item[];

	export const parseLines = (lineGroups: Item[]) =>
		lineGroups
			.map((lineGroup) => {
				return lineGroup.text
					.split(',')
					.flatMap((lineGroupSegment) => {
						let lineNumbers: RegExpExecArray | null;
						if ((lineNumbers = /(\d+) *- *(\d+)/.exec(lineGroupSegment)) !== null) {
							const start = Number(lineNumbers[1]) - 1;
							const length = Number(lineNumbers[2]) - Number(lineNumbers[1]) + 1;
							return Array.from({ length }, (_, i) => i + start);
						}

						let lineNumber: RegExpExecArray | null;
						if ((lineNumber = /\d+/.exec(lineGroupSegment)) !== null) {
							return Number(lineNumber[0]) - 1;
						}
					})
					.filter((lineNumber) => lineNumber !== undefined);
			})
			.filter((lineGroup) => lineGroup.length !== 0);

	export let lines: number[][] = parseLines(lineGroups);
	$: lines = parseLines(lineGroups);

	const handleSort = (e: CustomEvent<DndEvent<Item>>) => {
		lineGroups = e.detail.items;
	};

	const flipDurationMs = 100;
</script>

<label class="font-medium mb3">
	<p class="m0">Lines</p>
	<p class="font-normal m0 mt1 text-stone-6 max-w-prose">
		Lines of code to highlight and view sequential in your embed. Groups of lines should be
		represented as ranges or individual line numbers separated by commas.<br />
		eg. "1-7, 10" or "1-7" or "10"
	</p>
	<section
		class="mt3"
		use:dragHandleZone={{ items: lineGroups, flipDurationMs, dropTargetStyle: {} }}
		on:consider={handleSort}
		on:finalize={handleSort}
	>
		{#each lineGroups as item (item.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="flex items-stretch gap-2 mt3">
				<div
					use:dragHandle
					aria-label="drag-handle for {item.text}"
					class="grid place-content-center text-stone-6 rounded-xl ring-focus-visible"
				>
					<GripHorizontal size={24} />
				</div>
				<input
					bind:value={item.text}
					min="1"
					pattern="^( *(\d+|\d+ *- *\d+) *(,|$))*"
					class="box-border block w-full m-auto text-lg border border-solid px4 h10 rounded-xl border-stone-4 ring-focus-visible"
				/>
				<button
					class="grid bg-transparent border-none place-content-center text-stone-6 rounded-xl hover:bg-red-1 hover:text-red-6 ring-focus-visible"
					on:click={() => {
						const index = lineGroups.findIndex(({ id }) => id === item.id);
						if (index !== -1) lineGroups.splice(index, 1);
						lineGroups = lineGroups;
					}}
				>
					<Trash2 size={24} />
				</button>
			</div>
		{/each}
		<button
			class="grid w-full border-none bg-stone-1 p2 place-content-center text-stone-6 rounded-xl hover:bg-stone-2 focus:bg-stone-2 active:bg-stone-9 active:text-stone-1 ring-focus-visible mt2"
			on:click={() => {
				idCount++;
				lineGroups.push({ id: idCount, text: '' });
				lineGroups = lineGroups;
			}}
		>
			<Plus size={24} />
		</button>
	</section>
</label>
