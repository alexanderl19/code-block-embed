<script lang="ts">
	import type { PageData } from './$types';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import markdown from 'svelte-highlight/languages/markdown';
	import githubDark from 'svelte-highlight/styles/github-dark';
	import generateStyleTag from './generateStyleTag';
	import Group from './Group.svelte';

	export let data: PageData;

	let group = 0;
	$: highlightedLines = data.lines?.[group];
</script>

<svelte:head>
	{@html githubDark}
	{#if highlightedLines}
		{#each highlightedLines as lineNumber}
			{@html generateStyleTag(lineNumber)}
		{/each}
	{/if}
</svelte:head>

{#if data.lines}
	<Group bind:group max={data.lines.length} />
{/if}
<Highlight language={markdown} code={data.code} let:highlighted>
	<LineNumbers {highlighted} {highlightedLines} hideBorder wrapLines />
</Highlight>

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

	:global(.hljs):hover :global(tr) {
		opacity: 1;
		filter: saturate(1);
	}
</style>
