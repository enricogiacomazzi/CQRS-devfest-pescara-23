import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';

export const init = () =>
    axios.post(BASE_URL + '/commands/init')
        .then(() => undefined)
        .catch(() => undefined);

export const getData =  async () =>
    axios.get(BASE_URL + '/queries/getdata')
        .then(x => x.data);


export const deleteItem = (id: number) =>
    axios.post(BASE_URL + '/commands/deleteitem', {id})
        .then(() => undefined)
        .catch(() => undefined);

