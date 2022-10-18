import {MongoClient} from 'mongodb'

export async function ConnectDb(){
  const client = await MongoClient.connect('mongodb+srv://ashokjaiswal:hUWzNObFsCD4xIPT@cluster0.utylnvp.mongodb.net/events?retryWrites=true&w=majority')

  return client;
}

export async function insertDocument(client, collection, document){
  const db = client.db();
  const result = await db.collection(collection).insertOne(document)
  return result
}
export async function getDocument(client, collection){
    const db = client.db();
    const document = await db.collection(collection).find().sort({_id:-1}).toArray();
    return document
  
}

