import zeromq from 'zeromq';
import {MongoClient} from 'mongodb';
import {on} from 'node:events';
import init from './init.js';
import { EventPatcher } from './eventPatcher.js';

const db = new MongoClient('mongodb://localhost:27017/harry-todo-list').db();

await init(db);
console.log('init');

const patch = new EventPatcher(db);

await patch.applyEvents(true);


const commandSub = zeromq.socket('sub');
commandSub.connect("tcp://127.0.0.1:5000");
commandSub.subscribe("events-added");

const messagePub = zeromq.socket('pub');
messagePub.bindSync('tcp://127.0.0.1:5001');

patch.on('error', ({sessionId, error}) => {
    messagePub.send(['processed', JSON.stringify({type: 'message', sessionId, error: error.message})]);
});

for await(const topic of on(commandSub, 'message')) {
    if(topic.toString() !== 'events-added') {
        continue;
    }

    if(await patch.applyEvents()) {
        messagePub.send(['processed', JSON.stringify({type: 'update'})]);
    }
}
