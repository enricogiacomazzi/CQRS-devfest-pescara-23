
import Fastify from 'fastify'
import S from "fluent-json-schema";
import mongodb from "@fastify/mongodb";
import fastifyCors from '@fastify/cors';
import zeromq from 'zeromq';

const app = Fastify({ logger: {
    level: 'warn', 
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
}});

await app.register(mongodb, {url: 'mongodb://localhost:27017/harry-todo-list'});
await app.register(fastifyCors, {origin: '*'});

const socket = zeromq.socket('pub');
socket.bindSync('tcp://127.0.0.1:5000');

await app.decorate('pub', socket);

const schema = {
    body: S.object()
        .additionalProperties(false)
        .prop('id', S.number().required())
        .prop('sessionId', S.string().required())
}

app.post('/deleteitem', {schema}, async ({body}, reply) => {
    await app.mongo.db.collection('events')
        .insertOne({...body, timestamp: new Date().getTime()});

    app.pub.send(['events-added']);
});

await app.listen({ port: 3100 });