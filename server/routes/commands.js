import S from "fluent-json-schema";

export default async function(app, opts) {
    app.post('/init', async (request, reply) => {
        await app.repo.init();
    });

    const schema = {
        body: S.object()
            .additionalProperties(false)
            .prop('id', S.number().required())
            .prop('sessionId', S.string().required())
    }

    app.post('/deleteitem', {schema}, async (request, reply) => {
        app.channel.emit('deleteitem', request.body);
    });
}