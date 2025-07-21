<script lang="ts">
	import TaskForm from '$lib/components/shared/TaskForm/TaskForm.svelte';

	let { form }: { form: { success: boolean; message: string } } = $props();
</script>

<TaskForm pageName="Create Task" formSuccess={form?.success} formMessageProp={form?.message} />
