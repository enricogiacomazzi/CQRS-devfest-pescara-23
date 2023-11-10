


export interface QueryModel {
    items: Array<ItemModel>;
    errors?: ErrorModel
}

export interface ItemModel {
    id: number;
    text: string;
    imgUrl: string;
}

export interface ErrorModel {
    message: string;
}
