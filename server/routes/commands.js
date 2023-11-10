import S from "fluent-json-schema";

export default async function(app, opts) {
    app.post('/init', async (request, reply) => {
        await app.repo.init();
    });

    const schema = {
        body: S.object().prop('id', S.number().required())
    }

    app.post('/deleteitem', {schema}, async (request, reply) => {
        const {sessionId} = request.cookies;
        try {
            const {id} = request.body;
            await app.repo.deleteItem(id);
            app.repo.clearError(sessionId);
        }
        catch(e) {
            app.repo.setError(sessionId, { message: e.message });
        }
    });
}