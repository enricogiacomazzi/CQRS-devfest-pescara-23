
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import store from './store.js';

import routes from './routes/index.js';

const app = Fastify({ logger: {
    level: 'warn', 
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
}});


await app.register(fastifyCors, {origin: '*'});
await app.register(fastifyCookie);
await app.register(fastifySession, {secret: 'e8f16d60-7f10-11ee-b962-0242ac120002', cookie: { secure: false }});
await app.register(store);
await app.register(routes, {prefix: '/api'});
await app.listen({ port: 3003 });