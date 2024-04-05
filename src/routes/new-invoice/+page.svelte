<!-- <script>
	import { name, email, phone, lines, allInvoices } from '../../stores.js';
	import Product from '../../components/Product.svelte';
	import { onMount } from 'svelte';

	let invoiceNumber = $allInvoices.length + 1;

	onMount(() => {
		$name = '';
		$email = '';
		$phone = '';
		$lines = [];
	});

	function calcTotal() {
		return $lines.reduce((acc, curr) => {
			return acc + curr.quantity * curr.price;
		}, 0);
	}

	function addLine() {
		$lines = [...$lines, { product: '', description: '', quantity: '', price: '' }];
	}

	function handleSave() {
		if (invoiceNumber > $allInvoices.length) {
			$allInvoices = [
				...$allInvoices,
				{
					name: $name,
					email: $email,
					phone: $phone,
					lines: $lines,
					total: calcTotal(),
					invoiceNumber
				}
			];
		} else {
			$allInvoices[invoiceNumber - 1] = {
				name: $name,
				email: $email,
				phone: $phone,
				lines: $lines,
				total: calcTotal(),
				invoiceNumber
			};
		}
	}
</script>

<div id="container">
	<div id="invoice" class="shadow-xl border border-black rounded-xl">
		<img class="mx-auto mb-20" width="40%" src="hyfin.png" alt="logo" />
		<div id="customer">
			<input bind:value={$name} name="customer" placeholder="Customer" />
			<input bind:value={$phone} name="phone" placeholder="Phone" />
			<input bind:value={$email} name="email" placeholder="Email" />
		</div>
		<p>Invoice #{invoiceNumber}</p>
		<div id="product">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Product</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{#each $lines as line, i}
						<Product {i} bind:line />
					{/each}
					<button on:click={addLine}>Add Line</button>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td class="text-right">Total:</td>
						<td
							>{$lines.reduce((acc, curr) => {
								return acc + curr.quantity * curr.price;
							}, 0)}</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="btn-group">
		<button>SEND</button>
		<button on:click={handleSave}>SAVE</button>
	</div>
</div>

<style>
	#invoice {
		margin: 20px;
		padding: 40px;
	}
	#customer {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 40px;
	}
	th,
	th {
		background-color: #f2f2f2;
	}

	.btn-group {
		text-align: right;
		margin-right: 40px;
	}
</style> -->
<script>
	import InvoiceTable from '../../components/InvoiceTable.svelte';
</script>

<InvoiceTable />
