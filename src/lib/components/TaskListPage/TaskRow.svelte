<script lang="ts">
	import { Pencil, Check, X } from '@lucide/svelte';

	import type { Task } from '$lib/types/Task';

	type TaskRowProps = {
		task: Task;
		isEvenRow: boolean;
	};

	let isSubtasksOpen = $state(false);

	const { task, isEvenRow }: TaskRowProps = $props();
	const { id, name, subtasks } = task;

	const finishedTasks = subtasks.reduce((accumulator, currentValue) => {
		if (currentValue.finished) accumulator++;
		return accumulator;
	}, 0);
	const progression = Math.round((finishedTasks / subtasks.length) * 100);

	const handleRowClick = () => {
		isSubtasksOpen = !isSubtasksOpen;
	};
</script>

<tr class={['task-row', { 'even-row': isEvenRow, open: isSubtasksOpen }]} onclick={handleRowClick}>
	<td>{name}</td>
	<td>{progression}%</td>
	<td class="edit-column"
		><a
			onclick={(event: Event) => {
				event.stopPropagation();
			}}
			href="/task-list-comprehensive/edit/{id}"><Pencil size={16} /></a
		></td
	>
</tr>

{#if isSubtasksOpen}
	<tr class={['subtask-row', { 'even-row': isEvenRow }]}>
		<td colspan="3">
			<table class="subtask-table">
				<tbody>
					{#each subtasks as { name, finished }, index (index)}
						<tr>
							<td>{name}</td>
							<td>
								{#if finished}
									<Check color="green" size={16} />
								{:else}
									<X color="red" size={16} />
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</td>
	</tr>
{/if}

<style>
	tr.task-row {
		cursor: pointer;
	}

	tr.even-row {
		background-color: rgb(235, 235, 235);
	}

	tr.task-row.open {
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	tr.task-row td {
		padding: 1rem 2rem;
	}

	tr.subtask-row td {
		padding: 1rem 2.5rem;
	}

	.subtask-table {
		width: 100%;
	}

	.subtask-table tr > td:last-child {
		text-align: center;
	}

	tr.task-row td.edit-column a {
		color: black;
		text-decoration: none;
	}
</style>
