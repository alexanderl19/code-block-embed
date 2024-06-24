<script lang="ts">
	import 'virtual:uno.css';
	import '@fontsource-variable/archivo';
	import archivoWoff2 from '@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2?url';
</script>

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" href={archivoWoff2} crossorigin="anonymous" />
</svelte:head>

<slot />
