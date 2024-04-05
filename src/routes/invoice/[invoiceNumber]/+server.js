import { json } from '@sveltejs/kit';
import { invoices } from '../../../db/invoices';

export async function POST({ request }) {
	const data = await request.json();
	const dbres = await invoices.insertOne(data);
	const insertedInvoice = await invoices.findOne({ _id: dbres.insertedId });

	await new Promise((resolve) => setTimeout(resolve, 100));

	return json(insertedInvoice);
}
