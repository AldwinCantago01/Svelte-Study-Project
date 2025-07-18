<script lang="ts">
	import { Check, X, Trash } from '@lucide/svelte';

	import type { Subtask } from '$lib/types/Task';

	type SubtaskFieldProps = {
		index: number;
		subtask: Subtask;
		handleDeleteTask: (index: number) => void;
	};

	const {
		index,
		subtask = $bindable(),
		handleDeleteTask
	}: SubtaskFieldProps = $props();
</script>

<div class="subtask-field">
	<input type="hidden" name="subtask[{index}][finished]" bind:value={subtask.finished} />
	<input
		type="text"
		name="subtask[{index}][name]"
		bind:value={subtask.name}
	/>
	<div class="subtask-buttons">
		<button
			class="status-button"
			onclick={(event: Event) => {
				event.preventDefault();
				subtask.finished = !subtask.finished;
			}}
		>
			{#if subtask.finished}
				<Check size={16} />
			{:else}
				<X size={16} />
			{/if}
		</button>
		<button
			class="delete-button"
			onclick={(event: Event) => {
				event.preventDefault();
				handleDeleteTask(index);
			}}><Trash size={16} /></button
		>
	</div>
</div>

<style>
	div.subtask-field {
		height: 2.2rem;
		margin-bottom: 0.5rem;
		display: flex;
		gap: 0.5rem;
	}

	.subtask-field input {
		height: 100%;
		flex: 2 1 250px;
	}

	.subtask-field .subtask-buttons {
		height: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 1 40px;
		gap: 0.3rem;
	}

	.subtask-field .subtask-buttons button {
		cursor: pointer;
		height: 100%;
		border-width: 0.5px;
		border-radius: 3px;
		box-shadow: 2px 2px 5px rgb(230, 230, 230);
	}

	.subtask-field .subtask-buttons button.status-button {
		background-color: rgb(245, 245, 245);
	}

	.subtask-field .subtask-buttons button.status-button:hover {
		background-color: rgb(210, 210, 210);
	}

	.subtask-field .subtask-buttons button.delete-button {
		color: white;
		background-color: red;
	}

	.subtask-field .subtask-buttons button.delete-button:hover {
		background-color: rgb(200, 0, 0);
	}
</style>
