<script lang="ts">
	import type { PageProps } from './$types';
	import TaskForm from '$lib/components/shared/TaskForm/TaskForm.svelte';

	let { form }: PageProps = $props();
</script>

<TaskForm pageName="Create Task" formSuccess={form?.success} />
