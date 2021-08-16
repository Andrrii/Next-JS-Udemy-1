import { MongoClient } from 'mongodb'

export async function connectDatabase() {
    const client =  await MongoClient.connect("mongodb+srv://dbAdmin:butsaandrii25@cluster0.1crji.mongodb.net/events?retryWrites=true&w=majority")

    return client
}

export async function insertDocuments (client,collection,document) {
    const db = client.db()
        // Вертає проміс
        
    const result =  await db.collection(collection).insertOne(document)
    return result
}

export async function getAllDocuments (client,collection,sort,filter = {}) {
    const db = client.db()

    const documents = await db
            .collection(collection)
            .find(filter)
            .sort(sort)
            .toArray()
    
    return documents

}