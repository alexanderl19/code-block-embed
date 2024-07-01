<script lang="ts">
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import Embed from '$lib/Embed.svelte';
	import GithubMark from './GithubMark.svelte';
	import Switch from './Switch.svelte';

	import landingCode from '../landing-code.txt?raw';
	import Lines from './Lines.svelte';

	import { enhance } from '$app/forms';
	import Heart from './Heart.svelte';

	import og from './og.png';

	export let form: ActionData;

	let code = new URL('demo.txt', $page.url).toString();
	let fontSize = 16;
	// hardcode initial line numbers to prevent flash on hydration
	let lines: number[][] = [
		[0, 1, 2, 3, 4, 5, 6],
		[7, 8, 9, 10, 11, 12, 13],
		[14, 15, 16, 17, 18, 19, 20],
	];
	let showOnHover = false;
	let wrapLines = true;

	const embedBaseUrl = new URL('embed', $page.url);

	// TODO: centralize encode, decode logic, and defaults
	$: embedUrlSearchParamsArray = [
		['code', code],
		...(fontSize !== 16 ? [['fontSize', fontSize.toString()]] : []),
		...(lines.length !== 0 ? [['lines', lines.map((group) => group.toString()).join(':')]] : []),
		...(showOnHover !== true ? [['showOnHover', showOnHover.toString()]] : []),
		...(wrapLines !== true ? [['wrapLines', wrapLines ? '1' : '0']] : []),
	];
</script>

<svelte:head>
	<title>Code Block Embed</title>
	<meta
		name="description"
		content="Display interactive code blocks in your presentations, or wherever you can embed a webpage."
	/>
	<meta property="og:image" content={og} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex items-baseline justify-between font-sans mx3 my12">
	<p class="max-w-lg text-xl font-medium font-archivo text-balance">
		Display interactive code blocks in your presentations, or wherever you can embed a webpage. View
		this example <a
			class="text-blue-7 decoration-none hover:underline"
			href="https://tome.app/alexander/code-block-embed-clxtjhwu000gykagfr3imz6pa"
			target="_blank"
			rel="noopener noreferrer">Tome</a
		>.
	</p>
	<a
		href="https://github.com/alexanderl19/code-block-embed"
		target="_blank"
		rel="noopener noreferrer"
		class="mr-2"
	>
		<GithubMark />
	</a>
</div>
<div class="overflow-hidden m3 border-rd-xl bg-stone-1">
	<div class="relative">
		<div class="overflow-x-hidden border-rd-xl max-h-sm">
			<Embed
				code={form?.code || landingCode}
				{lines}
				{showOnHover}
				{fontSize}
				{wrapLines}
				positionAbsoluteSelector
			/>
		</div>
	</div>
	<p class="font-sans text-sm break-all mx5 my3 text-stone-4">
		{#key [code, fontSize, lines, showOnHover, wrapLines].join(';')}
			<span>{embedBaseUrl.protocol}//{embedBaseUrl.host}{embedBaseUrl.pathname}?</span
			>{#each embedUrlSearchParamsArray as [key, value], i}<span class="text-green-7">{key}</span
				>=<span class="text-blue-7">{value}</span
				>{#if embedUrlSearchParamsArray.length - 1 !== i}<span>&</span>{/if}{/each}
		{/key}
	</p>
</div>

<div class="flex flex-col max-w-2xl gap-4 font-sans text-sm mx3 my12">
	<p>
		<span class="rounded-full bg-red-1 py1 px2 text-red-9">Beta</span> The configurator below is not
		yet polished. However, code blocks / generated URLs are stable and safe to use in presentations.
		Read more about the project roadmap and goals on GitHub.
	</p>
	<form
		method="POST"
		use:enhance={({}) => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<label class="font-medium" for="code ">
			<p class="m0">Code URL</p>
			<p class="font-normal m0 mt1 text-stone-6 max-w-prose">
				URL that returns a raw text file. Be sure to click the "Raw" button before copying the link
				when using GitHub / Gists.
			</p>
		</label>
		<div class="flex items-stretch gap-2 my3">
			<input
				id="code"
				name="code"
				bind:value={code}
				min="1"
				type="url"
				class="box-border block w-full m-auto text-lg border border-solid px4 h10 rounded-xl border-stone-4 ring-focus-visible"
			/>
			<button
				class="grid border-none bg-stone-1 px2 place-content-center text-stone-6 rounded-xl hover:bg-stone-2 focus:bg-stone-2 active:bg-stone-9 active:text-stone-1 ring-focus-visible"
			>
				Update Preview
			</button>
		</div>
	</form>
	<Lines bind:lines />
	<label class="flex items-center gap-5 font-medium">
		<div class="w20">
			<input
				bind:value={fontSize}
				min="1"
				type="number"
				class="box-border block w-full m-auto text-2xl text-center border border-solid h10 rounded-xl border-stone-4 ring-focus-visible"
			/>
		</div>
		Font Size
	</label>
	<Switch
		bind:checked={showOnHover}
		label="Show on Hover"
		description="When specific lines are highlighted with the lines option, the rest of the page is blurred by default to focus attention. Enabling this option will unblur non-highlighted lines while hovering on the site."
	/>
	<Switch
		bind:checked={wrapLines}
		label="Wrap Lines"
		description="When lines exceed the width of the screen and this option is enabled, the excess will be shown below the line. When disabled, the page will scroll horizontally to show each line. This option has no effect on line numbering."
	/>
</div>

<footer class="flex items-center font-archivo mx3 my16 gap2">
	Made with
	<span class="text-red-5"><Heart /></span>
	<span
		>by <a
			class="text-black rounded-md ring-focus-visible decoration-none hover:decoration-underline focus-visible:decoration-underline"
			href="https://alexanderliu.com">Alexander Liu</a
		></span
	>
</footer>
