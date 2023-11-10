import React from 'react';
import {ItemModel} from '../models.ts';

interface ListItemProps {
    item: ItemModel,
    deleteItem: () => void
}
export const ListItem: React.FC<ListItemProps> = ({item, deleteItem}) => {

    const imgPath = `/images/${item.imgUrl}`;

    return (
        <div className="item" onClick={deleteItem}>
            <div className="img">
                <img src={imgPath}/>
            </div>
            <span>{item.text}</span>
        </div>
    )
}
