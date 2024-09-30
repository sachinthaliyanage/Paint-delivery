import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('Connected to MongoDB');
        return client;
      })
      .catch((err) => {
        console.error('Could not connect to MongoDB:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
 
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((client) => {
      console.log('Connected to MongoDB');
      return client;
    })
    .catch((err) => {
      console.error('Could not connect to MongoDB:', err);
      throw err;
    });
}

export default clientPromise;

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db();
    return { client, db };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}