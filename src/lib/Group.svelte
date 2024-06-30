<script lang="ts">
	import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-svelte';

	export let group: number;
	export let max: number;
	export let visible: boolean;
	export let showOnHover: boolean;
	export let positionAbsoluteSelector: boolean;
</script>

<div class="selector" class:absolute={positionAbsoluteSelector}>
	<div class="group">
		<button on:click={() => (group = Math.max(0, group - 1))}><ChevronLeft size={16} /></button>
		{group + 1} / {max}
		<button on:click={() => (group = Math.min(max - 1, group + 1))}>
			<ChevronRight size={16} />
		</button>
	</div>
	{#if !showOnHover}
		<button on:click={() => (visible = !visible)}>
			{#if visible}
				<EyeOff size={16} />
			{:else}
				<Eye size={16} />
			{/if}
		</button>
	{/if}
</div>

<style lang="scss">
	.selector {
		z-index: 10;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 16px;
		background-color: rgba(35, 35, 35, 0.65);
		backdrop-filter: saturate(200%) blur(4px);
		padding: 4px;
		border-radius: 1000px;
		color: #fff;
		display: flex;
		align-items: center;

		&.absolute {
			position: absolute;
		}
	}

	.group {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: system-ui, sans-serif;
		font-size: 14px;
		font-feature-settings: 'tnum' on, 'lnum' on;
	}

	button {
		all: unset;
		width: 36px;
		height: 36px;
		border-radius: 1000px;
		box-sizing: border-box;
		display: grid;
		place-content: center;
		color: #fff;

		&:hover {
			background: #282828;
		}

		&:active {
			background: #2e2e2e;
		}
	}
</style>
