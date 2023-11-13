
export default async function(app, opts) {
    app.get('/getdata', async () => await app.repo.getItems());
}