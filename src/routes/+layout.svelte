<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav class="navbar">
	<h1>ALDWIN'S APP</h1>
	<ul>
		<li>
			<a href="/task-list-comprehensive">TASK LIST (COMPREHENSIVE)</a>
		</li>
	</ul>
</nav>

<div class="actual-content">
    {@render children()}
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: 'Roboto', sans-serif;
	}

	nav.navbar {
		position: fixed;
        height: 65px;
        top: 0;
        left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 5rem;
		background-color: rgb(70, 70, 100);
	}

	nav.navbar h1 {
		margin: 0;
		color: white;
	}

	nav.navbar ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
		display: flex;
		gap: 2rem;
	}

	nav.navbar ul a {
		color: white;
		text-decoration: none;
	}

    div.actual-content {
        margin-top: 65px;
    }
</style>
