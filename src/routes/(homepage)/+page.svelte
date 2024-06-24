<script lang="ts">
	import { page } from '$app/stores';
	import Embed from '$lib/Embed.svelte';

	import landingCode from '../landing-code.txt?raw';

	const embedUrl = new URL('embed', $page.url);
	embedUrl.searchParams.set('code', new URL('demo.txt', $page.url).toString());

	$: embedUrlSearchParamsArray = Array.from(embedUrl.searchParams.entries());
</script>

<svelte:head>
	<title>Code Block Embed</title>
	<meta
		name="description"
		content="A site that displays raw text files with syntax highliting. Primarily designed to be embeded within presentations, such as with Tome."
	/>
</svelte:head>

<div class="m3 border-rd-xl overflow-hidden bg-stone-1">
	<div class="border-rd-xl overflow-x-hidden max-h-lg">
		<Embed code={landingCode} wrapLines={false} />
	</div>
	<p class="mx5 my3 font-sans text-sm text-stone-5">
		<span>{embedUrl.protocol}//{embedUrl.host}{embedUrl.pathname}?</span
		>{#each embedUrlSearchParamsArray as [key, value], i}<span class="text-green-7">{key}</span
			>=<span class="text-blue-7">{value}</span
			>{#if embedUrlSearchParamsArray.length - 1 !== i}<span>&</span>{/if}{/each}
	</p>
</div>
<div class="mx3 my12 font-sans">
	<p class="my6 font-archivo font-medium max-w-lg text-balance text-xl">
		Display interactive code blocks in your presentations, or wherever you can embed a webpage.
		<!-- View this example <a class="text-blue-7 decoration-none hover:underline" href="">Tome</a>. -->
	</p>
</div>
