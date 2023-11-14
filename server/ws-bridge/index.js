
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import ws from '@fastify/websocket';

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

await app.register(fastifyCors, {origin: '*'});
await app.register(ws);

await app.decorate('wslistener', new Map());

const socket = zeromq.socket('sub');
socket.connect("tcp://127.0.0.1:5001");
const socketTopic = 'processed';
socket.subscribe(socketTopic);


socket.on('message', (topic, msg) => {
    if(topic.toString() !== socketTopic) {
        return;
    }
    const {type, sessionId, error} = JSON.parse(msg.toString());

    switch(type) {
        case 'message':
            const ch = app.wslistener.get(sessionId);
            if(ch) {
                ch.send(JSON.stringify({type, error}));
            }
            break;
        case 'update':
            for(const ch of app.wslistener.values()) {
                ch.send(JSON.stringify({type}));
            }
            break;

    }
});


app.get('/:sessionId', {websocket: true}, async (conn, request, reply) => {
    const { sessionId } = request.params;

    app.wslistener.set(sessionId, conn.socket);

    conn.socket.on('close', () =>  {
        app.wslistener.delete(sessionId);
    });
});

await app.listen({ port: 3102 });