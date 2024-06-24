<script lang="ts">
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import githubDark from 'svelte-highlight/styles/github-dark';
	import generateStyleTag from './generateStyleTag';
	import Group from './Group.svelte';

	export let code: string;
	export let lines: number[][] = [];
	export let showOnHover: boolean = false;
	export let fontSize: number = 16;

	let group = 0;
	let visible = lines.length === 0;
	$: highlightedLines = lines[group];
</script>

<svelte:head>
	{@html githubDark}
	{#if highlightedLines}
		{#each highlightedLines as lineNumber}
			{@html generateStyleTag(lineNumber)}
		{/each}
	{/if}
</svelte:head>

{#if lines.length > 1}
	<Group bind:group max={lines.length} bind:visible {showOnHover} />
{/if}
<div class:showOnHover class:visible style:font-size={`${fontSize}px`}>
	<HighlightAuto {code} let:highlighted>
		<LineNumbers {highlighted} {highlightedLines} hideBorder wrapLines />
	</HighlightAuto>
</div>

<style lang="scss">
	:global(.hljs) :global(tr) {
		opacity: 0.5;
		filter: saturate(0.5) blur(1px);
		transition: opacity 500ms ease-out, filter 500ms ease-out;
	}

	.showOnHover :global(.hljs):hover :global(tr),
	.visible :global(.hljs) :global(tr) {
		opacity: 1;
		filter: saturate(1);
	}
</style>
