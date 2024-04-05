<script>
	import { blur, fly } from 'svelte/transition';

	import { allInvoices } from '../stores';

	export let i;
	export let line;
	export let handleRemove;
</script>

<tr in:blur out:fly={{ x: 900 }}>
	<td><button class="bg-gray-300 w-10 h-10" on:click={() => handleRemove(i)}>X</button></td>
	<td><input class="h-[40px]" bind:value={line.product} type="text" name="product" /></td>
	<td>
		<textarea
			class="border border-black rounded-sm"
			bind:value={line.description}
			type="text"
			name="description"
		/>
	</td>
	<td><input class="h-10" bind:value={line.quantity} type="number" min="1" name="quantity" /></td>
	<td><input class="h-10" bind:value={line.price} type="number" name="price" /></td>
	<td>{(line?.quantity * line?.price).toFixed(2)}</td>
</tr>
