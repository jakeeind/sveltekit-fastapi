<script lang="ts">
	import { onMount } from 'svelte';
	import apiFetch from '../lib/api';

	interface Item {
		id: number;
		name: string;
	}

	let itemId = $state();
	let item: Item | undefined = $state();

	async function getItemById(id: number) {
		const result = await apiFetch(`/items/${id}`);
    console.log(result);
		if (result.errors) {
			console.error(result.errors);
		} else {
			item = result.data;
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	<p>item id</p>
	<input type="text" bind:value={itemId} />
	<button
		disabled={!itemId}
		onclick={async () => {
			await getItemById(Number(itemId));
		}}
	>
		Get
	</button>
	<div>
		{#if item}
			<p>{item.id} - {item.name}</p>
		{/if}
	</div>
</div>
