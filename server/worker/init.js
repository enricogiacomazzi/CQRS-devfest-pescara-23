


export default async function(db) {
    const initialState = await db.collection('initial-state').find({}).toArray()
    const todoList = db.collection('todo-list');

    await todoList.deleteMany({});
    await todoList.insertMany(initialState.map(({_id, ...entity}) => entity));
    // await db.collection('events').deleteMany({});
}