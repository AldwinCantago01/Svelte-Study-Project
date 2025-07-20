<script lang="ts">
	import { Plus } from '@lucide/svelte';

	import type { PageProps } from './$types';
	import type { Task } from '$lib/types/Task';

	import TaskRow from '$lib/components/TaskListPage/TaskRow.svelte';

	const { data }: PageProps = $props();
	const { tasks } = data as { tasks: Task[] };
</script>

<div class="task-list-page">
	<div class="container">
		<h1 class="title">Task List</h1>
		<div class="task-list">
			<div class="top-section">
				<a href="/task-list-comprehensive/create"><Plus size={16} /> Create Task</a>
			</div>
			<div class="table-container">
				<table>
					<colgroup>
						<col class="name" />
						<col class="completion" />
						<col class="action" />
					</colgroup>
					<thead>
						<tr>
							<th>Task Name</th>
							<th>Completion</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{#each tasks as task, index (task.id)}
							<TaskRow {task} isEvenRow={index % 2 === 0} />
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	div.task-list-page {
		padding: 2rem;
		display: flex;
		justify-content: center;
	}

	div.task-list-page div.container {
		width: 60%;
		border-radius: 25px;
		box-shadow: 0px 0px 8px rgb(199, 199, 199);
	}

	div.task-list-page div.container h1.title {
		text-align: center;
		margin-bottom: 2rem;
	}

	div.task-list {
		margin: 0 2.5rem 2rem;
	}

	div.task-list div.top-section {
		display: flex;
		justify-content: end;
		margin-bottom: 1rem;
	}

	div.task-list div.top-section a {
		cursor: pointer;

		display: inline-flex;
		align-items: center;
		gap: 0.2rem;

		padding: 0.5rem 0.5rem;

		color: black;
		text-decoration: none;

		border-style: solid;
		border-width: 1px;
		border-color: gray;
		border-radius: 3px;
	}

	div.task-list div.top-section a:hover {
		background-color: rgb(245, 245, 245);
	}

	div.task-list div.table-container {
		max-width: 100%;
		overflow-x: auto;
	}

	div.task-list table {
		width: 100%;
		margin: 0 auto;
		border-collapse: collapse;
	}

	div.task-list table colgroup col.completion {
		width: 100px;
	}

	div.task-list table colgroup col.action {
		width: 50px;
	}

	div.task-list table thead tr th:first-child {
		border-top-left-radius: 10px;
	}

	div.task-list table thead tr th:last-child {
		border-top-right-radius: 10px;
	}

	div.task-list table thead tr th {
		padding: 1rem 2rem;
		color: white;
		text-align: left;
		background-color: #464664;
	}
</style>
