<script lang="ts">
  import type { Item } from "$lib/client";

	let itemId = $state();
	let item: Item | undefined = $state();

	async function getItemById(id: number) {}
</script>


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
