import {EventEmitter} from 'node:events';


export class EventPatcher extends EventEmitter {

    constructor(db) {
        super();
        this.db = db;
        this.timestamp = 0;
    }


    async applyEvents(skipError = false) {
        const todoList = this.db.collection('todo-list');
        const events = this.db.collection('events').find({timestamp: { $gt: this.timestamp}});

        let somethingChange = false;

        for await (const e of events) {
            try {
                const item = await todoList.findOne({id: e.id});
                const count = await todoList.countDocuments({});
    
                if(item === null) {
                    throw new Error('Item not found');
                }
    
                if(item.last && count  > 1) {
                    throw new Error('Voldemort must be the last.')
                }
                
                await todoList.deleteOne({_id: item._id});
                somethingChange = true;
            } catch (error) {
                if(!skipError) {
                    this.emit('error', {sessionId: e.sessionId, error});
                }
            }
            finally {
                this.timestamp = e.timestamp;
            }
        }

        return somethingChange;
    }

}