import React from 'react';
import {ItemModel} from '../models.ts';
import {ListItem} from './ListItem.tsx';


interface ListProps {
    items: Array<ItemModel>;
    deleteItem: (item: ItemModel) => void
}

export const List: React.FC<ListProps> = ({items, deleteItem}) => (
    <div className="list">
        {items.map(i => <ListItem key={i.id} item={i} deleteItem={() => deleteItem(i)}/>)}
    </div>
)

