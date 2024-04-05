import { startMongo } from './db/monogo';

startMongo()
	.then(() => {
		console.log('mongo started');
	})
	.catch((error) => console.log('error', error));
