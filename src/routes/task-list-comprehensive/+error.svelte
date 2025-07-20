<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>
	{page.status}
	{#if page.error}
		: {page.error.message}
	{/if}
</h1>

<style>
	h1 {
		padding-top: 1.5rem;
		text-align: center;
	}
</style>
