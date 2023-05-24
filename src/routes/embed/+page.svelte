<script lang="ts">
	import type { PageData } from './$types';
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import githubDark from 'svelte-highlight/styles/github-dark';
	import generateStyleTag from './generateStyleTag';
	import Group from './Group.svelte';

	export let data: PageData;

	let group = 0;
	let visible = data.lines.length === 0;
	$: highlightedLines = data.lines[group];
</script>

<svelte:head>
	{@html githubDark}
	{#if highlightedLines}
		{#each highlightedLines as lineNumber}
			{@html generateStyleTag(lineNumber)}
		{/each}
	{/if}
</svelte:head>

{#if data.lines.length > 1}
	<Group bind:group max={data.lines.length} bind:visible showOnHover={data.showOnHover} />
{/if}
<div class:showOnHover={data.showOnHover} class:visible>
	<HighlightAuto code={data.code} let:highlighted>
		<LineNumbers {highlighted} {highlightedLines} hideBorder wrapLines />
	</HighlightAuto>
</div>

<style lang="scss">
	:global(body) {
		background: #0d1117;

		// Hide Scrollbar
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

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
