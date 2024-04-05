<script>
	import { allInvoices } from '../stores';
	export let data;
	$allInvoices = JSON.parse(data.props.invoices);
</script>

<div>
	<img class="logo mx-auto mb-20" width="40%" src="/hyfin.png" alt="logo" />
	<h2 class="text-4xl text-center mb-4">INVOICES</h2>

	<div class="inv-container pt-4 flex flex-col h-[380px] ml-20 mr-20 border overflow-auto">
		<a class="m-2 text-center" href="/new-invoice"><button>NEW INVOICE</button></a>

		{#each [...$allInvoices].reverse() as invoice}
			<a
				class="bg-gray-100 w-fill border rounded-xl shadow-md m-2 p-2"
				href={`/invoice/${invoice.invoiceNumber}`}
			>
				<div
					class:paid={invoice.paid}
					class="mr-10 w-[150px] inline-block text-center border bg-red-500 text-white rounded-md p-2"
				>
					{invoice.paid ? 'PAID' : 'NOT PAID'}
				</div>
				Invoice#{invoice.invoiceNumber} - Customer:{invoice.customer}
			</a>
		{/each}
	</div>
</div>

<style>
	.logo {
		filter: drop-shadow(5px 5px 5px rgb(65, 65, 65));
	}
	.paid {
		background-color: rgb(47, 175, 47);
	}
	.inv-container {
		border-radius: 10px;
		border-radius: 35px;
		background: #ffffff;
		box-shadow:
			8px 8px 16px #9e9e9e,
			-8px -8px 16px #ffffff;
	}
</style>
