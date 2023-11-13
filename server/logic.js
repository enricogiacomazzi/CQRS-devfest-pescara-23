

export default async function(app, opts) {
    app.channel.on('deleteitem', async ({id, sessionId}) => {
        try {
            await app.repo.deleteItem(id);
            app.channel.emit(sessionId, { type: 'update' });
        } catch (e) {
            app.channel.emit(sessionId, {
                type: 'message',
                message: e.message
            });
        }
    });
}