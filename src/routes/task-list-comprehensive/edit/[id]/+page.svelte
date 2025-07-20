<script lang="ts">
	import type { PageProps } from './$types';
	import type { Task } from '$lib/types/Task';

	import TaskForm from '$lib/components/shared/TaskForm/TaskForm.svelte';

	const { form, data }: PageProps = $props();
	const { task } = data as { task: Task };
</script>

<TaskForm
	formSuccess={form?.success}
	pageName="Edit Task"
	taskIDProp={task.id}
	taskNameProp={task.name}
	subtasksProp={task.subtasks}
/>
