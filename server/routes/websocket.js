import {nanoid} from 'nanoid';



export default async function(app, opts) {
    app.get('/:sessionId', {websocket: true}, async (conn, request, reply) => {
        const { sessionId } = request.params;
        
        const sender =  msg => {
            conn.socket.send(JSON.stringify(msg));
        };

        app.channel.on(sessionId, sender);

        conn.socket.on('close', () =>  {
            app.channel.removeListener(sessionId, sender);
        });
    });
}