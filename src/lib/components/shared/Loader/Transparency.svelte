<script>
	import Loader from '$lib/components/shared/Loader/Loader.svelte';
</script>

<div class="loader-component">
	<Loader />
</div>

<style>
	div.loader-component {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		background-color: rgba(150, 150, 150, 0.5);

		border-radius: var(--border-radius, 25px);

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
