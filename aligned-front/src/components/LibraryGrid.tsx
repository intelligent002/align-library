import React from 'react';
import {LibraryItem} from './types';
import LibraryCard from './LibraryCard';

interface Props {
    items: LibraryItem[];
    onDelete: (id: string) => void;
    onEdit: (item: LibraryItem) => void;
}

const LibraryGrid: React.FC<Props> = ({items, onDelete, onEdit}) => {
    return (
        <>
            {items.map((item, index) => (
                <LibraryCard key={item.id || `fallback-key-${index}`} item={item} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </>
    );
};

export default LibraryGrid;