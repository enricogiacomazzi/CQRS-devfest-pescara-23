import fp from "fastify-plugin";



class Repository {
    #items = [];

    constructor() {
        this.init();
    }

    init() {
        const items = [
            {
                text: 'Tom Riddle\'s Diary',
                imgUrl: '1.webp'
            },
            {
                text: 'Marvolo Gaunt\'s Ring',
                imgUrl: '2.webp'
            },
            {
                text: 'Salazar Slytherin\'s Locket',
                imgUrl: '3.webp'
            },
            {
                text: 'Helga Hufflepuff\'s Cup',
                imgUrl: '4.webp'
            },
            {
                text: 'Rowena Ravenclaw\'s Lost Diadem',
                imgUrl: '5.webp'
            },
            {
                text: 'Nagini',
                imgUrl: '6.webp'
            },
            {
                text: 'Lord Voldemort',
                imgUrl: '7.webp',
                last: true
            }
        ];

        this.#items = items.map((item, i) => ({...item, id: i + 1}));
        return Promise.resolve();
    }

    getItems() {
        return Promise.resolve({
            items: this.#items,
        });
    }

    deleteItem(id) {
        const index = this.#items.findIndex(x => x.id === id);

        if(!!this.#items[index].last && this.#items.length > 1) {
            return Promise.reject(new Error('Voldemort must be the last.'));
        }

        this.#items.splice(index, 1);
        return Promise.resolve();
    }

}

const plugin = fp(async (app, opts) => {    
    await app.decorate('repo', new Repository());
});

export default plugin;
