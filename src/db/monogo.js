import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();
// import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(process.env.MONGO_URL);

export function startMongo() {
	console.log('startin mongo');
	return client.connect();
}

export default client.db();
