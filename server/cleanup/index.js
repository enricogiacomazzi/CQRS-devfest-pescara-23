import {MongoClient} from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017/harry-todo-list');
const db = client.db();

await db.collection('events').deleteMany({});

await client.close();

console.log('clean');