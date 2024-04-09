import { json } from '@sveltejs/kit';
import { invoices } from '../../../db/invoices';

export async function POST({ request }) {
	//would verify Hyfin auth token here
	const data = await request.json();
	data.invoiceNumber = +data.invoiceNumber;
	const dbres = await invoices.insertOne(data);
	const insertedInvoice = await invoices.findOne({ _id: dbres.insertedId });

	return json(insertedInvoice);
}

export async function PUT({ request }) {
	const data = await request.json();

	const updated = await invoices.findOneAndReplace(
		{ invoiceNumber: +data.invoiceNumber },
		{ ...data, invoiceNumber: +data.invoiceNumber }
	);

	return json(updated);
}
