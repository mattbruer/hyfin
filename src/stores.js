import { writable } from 'svelte/store';

export const name = writable('');
export const email = writable('');
export const phone = writable('');
export const lines = writable([{ product: '', description: '', quantity: '', price: '' }]);
export const allInvoices = writable([]);
