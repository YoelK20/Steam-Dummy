import { Db, MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URL;

// console.log(connectionString, '<<< connection string')
// Memastikan bahwa connectionString sudah ada value-nya
if (!connectionString) {
  throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

// Tipe data dari client adalah MongoClient
let client: MongoClient;

// Fungsi ini akan mengembalikan client yang sudah terkoneksi dengan MongoDB
// Hanya boleh ada 1 instance client (Singleton)
export const getMongoClientInstance = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionString);
    await client.connect();
  }

  return client;
};

export const getDB = async () => {
    const client = await getMongoClientInstance()
    const db: Db = client.db("SteemDB")

    return db
}
