
import Fastify from 'fastify'
import S from "fluent-json-schema";
import mongodb from "@fastify/mongodb";
import fastifyCors from '@fastify/cors';

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

const schema = {
    response: {
        200: S.array().items(S.object()
                .prop('id', S.number())
                .prop('text', S.string())
                .prop('imgUrl', S.string())
        )
    }
}

app.get('/getitems', {schema}, async () => 
    await app.mongo.db.collection('todo-list').find({}).toArray());

await app.listen({ port: 3101 });



