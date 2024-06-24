<script lang="ts">
	import Embed from '$lib/Embed.svelte';

	import landingCode from './landing-code.txt?raw';
</script>

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
