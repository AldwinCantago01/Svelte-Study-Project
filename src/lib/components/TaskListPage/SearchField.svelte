<script lang="ts">
	import type { Task } from '$lib/types/Task';

	import { Search } from '@lucide/svelte';

	type SearchFieldProps = {
		isAPILoading: boolean;
		reactiveTasks: Task[];
		handleReset: () => void;
	};

	let {
		isAPILoading = $bindable(),
		reactiveTasks = $bindable(),
		handleReset
	}: SearchFieldProps = $props();

	let searchValue = $state('');
	let isSearchValueEmpty = $derived.by(() => searchValue.trim() === '');

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		if (isSearchValueEmpty) {
			handleReset();
			return;
		}

		isAPILoading = true;
		try {
			const response = await fetch(`/api/tasks?search=${encodeURIComponent(searchValue.trim())}`);

			if (!response.ok) {
				console.error('Failed to fetch:', response.status);
				return;
			}

			const { tasks }: { tasks: Task[] } = await response.json();
			reactiveTasks = tasks;
		} catch (err) {
			console.error('Error fetching:', err);
		} finally {
			isAPILoading = false;
		}
	};
</script>

<form class="search-group" onsubmit={handleSubmit}>
	<input type="text" bind:value={searchValue} placeholder="Search..." />
	<button><Search size={20} /></button>
</form>

<style>
	form.search-group {
		width: 25%;
		display: inline-flex;
		gap: 0px;
	}

	form.search-group input {
		flex: 1 1 200px;
		border-width: 1px;
		border-radius: 3px 0 0 3px;
	}

	form.search-group input:focus {
		outline: none;
	}

	form.search-group button {
		cursor: pointer;
		border-width: 1px;
		border-radius: 0 3px 3px 0;
	}
</style>
