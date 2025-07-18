<script lang="ts">
	import type { PageData } from './$types';
	import TaskForm from '$lib/components/shared/TaskForm/TaskForm.svelte';

	const { data }: {data: PageData} = $props();
	const { task } = data;
</script>

<TaskForm pageName="Edit Task" taskIDProp={task.id} taskNameProp={task.name} subtasksProp={task.subtasks} />
