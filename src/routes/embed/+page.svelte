<script lang="ts">
	import type { PageData } from './$types';
	import Embed from '$lib/Embed.svelte';

	export let data: PageData;
</script>

<Embed {...data} />
