<script>
	import Product from '../components/Product.svelte';
	import { allInvoices } from '../stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let invoiceNumber = +$page.params.invoiceNumber || $allInvoices.length + 1;

	// let createdAt = new Date();
	// let date = createdAt.toLocaleDateString();
	// let time = createdAt.toLocaleTimeString();

	let customer,
		phone,
		email,
		paid,
		lines = [],
		loading = false;

	//this makes sure data is avail on page refreshes

	if ($allInvoices.length === 0) {
		$allInvoices = JSON.parse($page.data.props.invoices);
	}

	if ($page.params.invoiceNumber && $allInvoices[invoiceNumber - 1]) {
		customer = $allInvoices[invoiceNumber - 1].customer;
		phone = $allInvoices[invoiceNumber - 1].phone;
		email = $allInvoices[invoiceNumber - 1].email;
		lines = $allInvoices[invoiceNumber - 1].lines;
		paid = $allInvoices[invoiceNumber - 1].paid;
	}

	function addLine() {
		lines = [...lines, { product: '', description: '', quantity: '', price: '' }];
	}

	async function handleSave() {
		loading = true;
		//for first save
		if ($allInvoices.length < invoiceNumber) {
			try {
				let response = await fetch(`/invoice/${invoiceNumber}`, {
					method: 'POST',
					body: JSON.stringify({ customer, phone, email, paid: !!paid, lines, invoiceNumber }),
					headers: {
						'Content-Type': 'application/json'
						//this is where the hyfin auth token would go
						//x-access-token:API_TOKEN_VALUE
					}
				});
				response = await response.json();
				loading = false;
				$allInvoices = [
					...$allInvoices,
					{
						customer: response.customer,
						phone: response.phone,
						email: response.email,
						lines: response.lines,
						invoiceNumber: response.invoiceNumber,
						paid: response.paid
					}
				];
				goto('/');
			} catch (error) {
				console.log('error', error);
				alert('Something went wrong');
			}
		} else {
			//every save after initial save
			try {
				let response = await fetch(`/invoice/${invoiceNumber}`, {
					method: 'PUT',
					body: JSON.stringify({ customer, phone, email, paid: !!paid, lines, invoiceNumber }),
					headers: {
						'Content-Type': 'application/json'
						//this is where the hyfin auth token would go
						//x-access-token:API_TOKEN_VALUE
					}
				});
				response = await response.json();
				$allInvoices[invoiceNumber - 1] = {
					customer: response.customer,
					phone: response.phone,
					email: response.email,
					lines: response.lines,
					invoiceNumber: response.invoiceNumber,
					paid: response.paid
				};

				window.location.href = '/';
			} catch (error) {
				console.log('error', error);
				alert('Something went wrong.');
			}
		}
	}

	function handleRemove(i) {
		lines = lines.filter((_, index) => index !== i);
	}
</script>

{#if loading}
	<div class="h-screen flex items-center justify-center">
		<div class:spinner={loading} class="animate-spin"></div>
	</div>
{:else}
	<div id="container">
		<div id="invoice" class="shadow-xl border border-black rounded-xl">
			<img class="logo mx-auto mb-20" width="40%" src="/hyfin.png" alt="logo" />
			<div id="customer">
				<input bind:value={customer} name="customer" placeholder="Customer" />
				<input bind:value={phone} name="phone" placeholder="Phone" />
				<input bind:value={email} name="email" placeholder="Email" />
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
						{#each lines as line, i}
							<Product {handleRemove} {i} bind:line />
						{/each}
						<button class="w-[100px]" on:click={addLine}>ADD LINE</button>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td class="text-right">Total:</td>
							<td class="total">
								{lines
									.reduce((acc, curr) => {
										return acc + curr.quantity * curr.price;
									}, 0)
									.toFixed(2)}
							</td>
						</tr>
					</tbody>
				</table>

				<h2 class:invisible={!paid} class="text-red-500 text-6xl text-right">PAID</h2>
			</div>
		</div>
		<div class="btn-group mb-10">
			<a href="/"><button>ALL INVOICES</button></a>
			<button
				on:click={() => {
					paid = !paid;
				}}>{paid ? 'NOT PAID' : 'PAID'}</button
			>

			<button disabled={loading} on:click={handleSave}>{loading ? '...' : 'SAVE'}</button>
		</div>
	</div>
{/if}

<style>
	.spinner {
		border-bottom: 5px dashed red;
		border-radius: 50%;
		height: 100px;
		width: 100px;
	}
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
	.btn-group button {
		width: 200px;
		margin: 0px 20px;
	}
	.total {
		border-top: 1px solid black;
	}
</style>
