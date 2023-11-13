import websocket from "./websocket.js";
import commands from "./commands.js";
import queries from "./queries.js";

export default async function(app, opts) {
    await app.register(websocket, {prefix: '/ws'});
    await app.register(commands, {prefix: '/commands'});
    await app.register(queries, {prefix: '/queries'});
}