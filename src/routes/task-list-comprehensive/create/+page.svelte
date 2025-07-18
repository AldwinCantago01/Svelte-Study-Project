<script lang="ts">
	import { Plus, Check, CornerDownLeft } from '@lucide/svelte';

	import type { Subtask } from '$lib/types/Task';

	import SubtaskField from '$lib/components/CreateTaskPage/SubtaskField.svelte';

	let subtasks: Subtask[] = $state([
		{
			name: '',
			finished: false
		}
	]);

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

<div class="task-list-create-page">
	<div class="task-list-create-container">
		<h1 class="title">Create Task</h1>
		<form method="POST">
			<div class="task-name-field">
				<label for="TaskName">Task Name:</label>
				<input id="TaskName" type="text" name="name" />
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
	div.task-list-create-page {
		padding: 2rem;
		display: flex;
		justify-content: center;
	}

	div.task-list-create-container {
		width: 40%;
		border-radius: 25px;
		box-shadow: 0px 0px 8px rgb(199, 199, 199);
	}

	div.task-list-create-container h1.title {
		text-align: center;
	}

	div.task-list-create-container form {
		margin: 0 4rem 2rem;
	}

	div.task-list-create-container form label,
	div.task-list-create-container form .subtask-fields .subtasks-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	div.task-list-create-container form .task-name-field input[type='text'] {
		height: 2.2rem;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 5px;
		border-style: solid;
	}

	div.task-list-create-container form .task-name-field {
		margin-bottom: 1.5rem;
	}

	div.task-list-create-container form .subtask-fields {
		margin-bottom: 2rem;
	}

	div.task-list-create-container form div.action-buttons {
		height: 2.2rem;
		display: flex;
		justify-content: space-between;
	}

	div.task-list-create-container form div.action-buttons .right-section {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
	}

	div.task-list-create-container form div.action-buttons button,
	div.task-list-create-container form div.action-buttons a {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
	}

	div.task-list-create-container form div.action-buttons .back {
		height: 100%;
		padding: 0.2rem 0.5rem;
		border-style: solid;
		border-width: 1px;
		border-color: gray;
		border-radius: 3px;
		color: black;
		text-decoration: none;
	}

	div.task-list-create-container form div.action-buttons .back:hover {
		background-color: rgb(250, 250, 250);
	}

	div.task-list-create-container form div.action-buttons .submit {
		height: 100%;
		color: white;
		background-color: green;
		border-width: 0.5px;
		border-radius: 3px;
	}

	div.task-list-create-container form div.action-buttons .submit:hover {
		background-color: rgb(0, 100, 0);
	}
</style>
