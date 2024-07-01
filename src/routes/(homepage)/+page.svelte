<script lang="ts">
	import type { ActionData } from './$types';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import Embed from '$lib/Embed.svelte';

	import landingCode from '../landing-code.txt?raw';

	import GithubMark from './GithubMark.svelte';
	import Switch from './Switch.svelte';
	import Lines from './Lines.svelte';
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

<div class="mx3 my16 font-sans flex justify-between items-start lg:items-baseline">
	<p class="m0 text-xl font-medium font-archivo max-w-lg text-balance">
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
		class="mr-2 mt2 line-height-[0] lg:mt0"
	>
		<GithubMark />
	</a>
</div>
<div class="m3 bg-stone-1 border-rd-xl overflow-hidden">
	<div class="relative">
		<div class="border-rd-xl max-h-sm overflow-x-hidden">
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
	<p class="mx5 my3 text-sm text-stone-4 font-sans break-all">
		{#key [code, fontSize, lines, showOnHover, wrapLines].join(';')}
			<span>{embedBaseUrl.protocol}//{embedBaseUrl.host}{embedBaseUrl.pathname}?</span
			>{#each embedUrlSearchParamsArray as [key, value], i}<span class="text-green-7">{key}</span
				>=<span class="text-blue-7">{value}</span
				>{#if embedUrlSearchParamsArray.length - 1 !== i}<span>&</span>{/if}{/each}
		{/key}
	</p>
</div>

<div class="mx3 my12 text-sm font-sans flex flex-col gap-4 max-w-2xl">
	<p>
		<span class="px2 py1 bg-red-1 rounded-full text-red-9">Beta</span> The configurator below is not
		yet polished. However, code blocks / generated URLs are stable and safe to use in presentations.
		Read more about the project roadmap and goals on GitHub.
	</p>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<label class="font-medium" for="code ">
			<p class="m0">Code URL</p>
			<p class="m0 mt1 text-stone-6 font-normal max-w-prose">
				URL that returns a raw text file. Be sure to click the "Raw" button before copying the link
				when using GitHub / Gists.
			</p>
		</label>
		<div class="my3 flex gap-2 items-stretch">
			<input
				id="code"
				name="code"
				bind:value={code}
				min="1"
				type="url"
				class="px4 m-auto block border border-stone-4 rounded-xl border-solid text-lg h10 w-full box-border ring-focus-visible"
			/>
			<button
				class="px2 bg-stone-1 rounded-xl border-none text-stone-6 grid place-content-center active:bg-stone-9 focus:bg-stone-2 hover:bg-stone-2 active:text-stone-1 ring-focus-visible"
			>
				Update Preview
			</button>
		</div>
	</form>
	<Lines bind:lines />
	<label class="font-medium flex gap-5 items-center">
		<div class="w20">
			<input
				bind:value={fontSize}
				min="1"
				type="number"
				class="m-auto block border border-stone-4 rounded-xl border-solid text-2xl text-center h10 w-full box-border ring-focus-visible"
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

<footer class="mx3 my16 font-archivo flex gap2 items-center">
	Made with
	<span class="text-red-5"><Heart /></span>
	<span
		>by <a
			class="rounded-md text-black decoration-none focus-visible:decoration-underline hover:decoration-underline ring-focus-visible"
			href="https://alexanderliu.com">Alexander Liu</a
		></span
	>
</footer>
