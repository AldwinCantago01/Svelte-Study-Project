<script lang="ts">
	import { Plus, Check, CornerDownLeft } from '@lucide/svelte';

	import type { Subtask } from '$lib/types/Task';

	import SubtaskField from '$lib/components/shared/TaskForm/subcomponents/SubtaskField.svelte';

	type TaskFormProps = {
		taskIDProp?: number;
		pageName: string;
		taskNameProp?: string;
		subtasksProp?: Subtask[];
	};

	const {
		taskIDProp,
		pageName,
		taskNameProp = '',
		subtasksProp = [
			{
				name: '',
				finished: false
			}
		]
	}: TaskFormProps = $props();

	let taskName: string = $state(taskNameProp);
	let subtasks: Subtask[] = $state(subtasksProp);

	const handleAddSubtask = (event: Event) => {
		event.preventDefault();
		subtasks.push({
			name: '',
			finished: false
		});
	};

	const handleDeleteTask = (index: number) => {
		subtasks.splice(index, 1);
	};
</script>

<div class="task-form-component">
	<div class="container">
		<h1 class="title">{pageName}</h1>
		<form method="POST">
			<input type="hidden" name="id" value={taskIDProp} />
			<div class="task-name-field">
				<label for="TaskName">Task Name:</label>
				<input id="TaskName" type="text" name="name" bind:value={taskName} />
			</div>
			<div class="subtask-fields">
				<div class="subtasks-label">Subtasks:</div>
				{#each subtasks as subtask, index (index)}
					<SubtaskField {index} bind:subtask={subtasks[index]} {handleDeleteTask} />
				{/each}
			</div>
			<div class="action-buttons">
				<button class="add-task" onclick={handleAddSubtask}><Plus size={16} /> Add Task</button>
				<div class="right-section">
					<a class="back" href="/task-list-comprehensive"><CornerDownLeft size={16} /> Back</a>
					<button class="submit"><Check size={16} /> Create Task</button>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	div.task-form-component {
		padding: 2rem;
		display: flex;
		justify-content: center;
	}

	div.task-form-component div.container {
		width: 40%;
		border-radius: 25px;
		box-shadow: 0px 0px 8px rgb(199, 199, 199);
	}

	div.task-form-component div.container h1.title {
		text-align: center;
	}

	div.task-form-component div.container form {
		margin: 0 4rem 2rem;
	}

	div.task-form-component div.container form label,
	div.task-form-component div.container form div.subtask-fields div.subtasks-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	div.task-form-component div.container form div.task-name-field input[type='text'] {
		height: 2.2rem;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 5px;
		border-style: solid;
	}

	div.task-form-component div.container form div.task-name-field {
		margin-bottom: 1.5rem;
	}

	div.task-form-component div.container form div.subtask-fields {
		margin-bottom: 2rem;
	}

	div.task-form-component div.container form div.action-buttons {
		height: 2.2rem;
		display: flex;
		justify-content: space-between;
	}

	div.task-form-component div.container form div.action-buttons div.right-section {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
	}

	div.task-form-component div.container form div.action-buttons button,
	div.task-form-component div.container form div.action-buttons a {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	div.task-form-component div.container form div.action-buttons a.back {
		height: 100%;
		padding: 0.2rem 0.5rem;
		border-style: solid;
		border-width: 1px;
		border-color: gray;
		border-radius: 3px;
		color: black;
		text-decoration: none;
	}

	div.task-form-component div.container form div.action-buttons a.back:hover {
		background-color: rgb(250, 250, 250);
	}

	div.task-form-component div.container form div.action-buttons button.submit {
		height: 100%;
		color: white;
		background-color: green;
		border-width: 0.5px;
		border-radius: 3px;
	}

	div.task-form-component div.container form div.action-buttons button.submit:hover {
		background-color: rgb(0, 100, 0);
	}
</style>
