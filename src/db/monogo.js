import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const client = new MongoClient(process.env.MONGO_URL);

export function startMongo() {
	console.log('startin mongo');
	return client.connect();
}

export default client.db();
