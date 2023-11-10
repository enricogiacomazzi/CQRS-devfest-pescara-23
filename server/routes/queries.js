


export default async function(app, opts) {
    app.get('/getdata', async (request, reply) => await app.repo.getData(request.cookies.sessionId));
}