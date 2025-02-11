<script lang="ts">
	import { api } from '../lib/api';

	interface Item {
		id: number;
		name: string;
	}

	let itemId = $state();
	let item: Item | undefined = $state();

	async function getItemById(id: number) {}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	<p>item id</p>
	<input type="text" bind:value={itemId} />
	<button
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
