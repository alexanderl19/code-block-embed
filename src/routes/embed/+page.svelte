<script lang="ts">
	import type { PageData } from './$types';
	import Embed from '$lib/Embed.svelte';

	export let data: PageData;
	$: ({ code, lines, showOnHover, fontSize, wrapLines, fileName } = data);
</script>

<svelte:head>
	<title>{fileName}</title>
</svelte:head>

<Embed {code} {lines} {showOnHover} {fontSize} {wrapLines} />

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
</style>
