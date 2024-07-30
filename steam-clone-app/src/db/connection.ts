import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

if(!uri) {
    throw new Error ("MONGODB ENV must be provided")
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});