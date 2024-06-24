<script lang="ts">
	import type { PageData } from './$types';
	import Embed from '$lib/Embed.svelte';

	export let data: PageData;
</script>

<Embed {...data} />

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
