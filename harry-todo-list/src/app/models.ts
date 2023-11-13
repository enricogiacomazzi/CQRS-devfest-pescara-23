


export interface QueryModel {
  items: Array<ItemModel>;
}


export interface ItemModel {
  id: number;
  text: string;
  imgUrl: string;
}

export interface StartMessageModel {
  type: 'start';
  sessionId: string;
}

export interface UpdateMessageModel {
  type: 'update';
}

export interface ErrorMessageModel {
  type: 'message';
  message: string
}

export type MessageModel = StartMessageModel | UpdateMessageModel | ErrorMessageModel;
