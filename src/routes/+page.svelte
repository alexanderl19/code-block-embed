<script lang="ts">
	import Embed from '$lib/Embed.svelte';

	import landingCode from './landing-code.txt?raw';
</script>

<svelte:head>
	<title>Code Block Embed</title>
	<meta
		name="description"
		content="A site that displays raw text files with syntax highliting. Primarily designed to be embeded within presentations, such as with Tome."
	/>
</svelte:head>

<div class="code-embed">
	<Embed code={landingCode} wrapLines={false} />
</div>

<style lang="scss">
	.code-embed {
		margin: 12px;
		border-radius: 12px;
		overflow-x: hidden;
		max-height: 512px;
	}
</style>
