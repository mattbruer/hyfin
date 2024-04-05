import { invoices } from '../db/invoices';

export const load = async function () {
	const data = await invoices.find({}).toArray();

	return {
		props: {
			invoices: JSON.stringify(data)
		}
	};
};
