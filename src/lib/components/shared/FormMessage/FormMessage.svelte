<script lang="ts">
	import { Info, X } from '@lucide/svelte';

	type FormMessageProps = {
		message: string;
		onCloseClick: () => void;
	};

	const { message, onCloseClick }: FormMessageProps = $props();

	const handleClose = (event: Event) => {
		event.preventDefault();
		onCloseClick();
	};
</script>

<div class="message-component">
	<div>
		<Info />
	</div>
	<p>
		{message}
	</p>
	<button onclick={handleClose}>
		<X size={20} />
	</button>
</div>

<style>
	.message-component {
		display: flex;
		align-items: center;
		gap: 1rem;

		border-style: solid;
		border-width: 1px;
		border-radius: 5px;

		background-color: rgb(240, 240, 240);
		margin-bottom: 1.25rem;
		padding: 1rem 1.5rem;
	}

	.message-component div {
		flex: 0 1 20px;
	}

	.message-component p {
		flex: 1 1 200px;
		margin: 0;
		text-align: center;
		word-break: break-word;
	}

	.message-component > button {
		cursor: pointer;
		border-style: none;
	}
</style>
