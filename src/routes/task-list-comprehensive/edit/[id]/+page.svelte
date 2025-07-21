<script lang="ts">
	import type { PageData } from './$types';
	import type { Task } from '$lib/types/Task';

	import TaskForm from '$lib/components/shared/TaskForm/TaskForm.svelte';

	const { form, data }: { form: { success: boolean; message: string }; data: PageData } = $props();
	const { task } = data as { task: Task };
</script>

<TaskForm
	formSuccess={form?.success}
	formMessageProp={form?.message}
	pageName="Edit Task"
	taskIDProp={task.id}
	taskNameProp={task.name}
	subtasksProp={task.subtasks}
/>
