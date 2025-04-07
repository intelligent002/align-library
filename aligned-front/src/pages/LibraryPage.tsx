import React, {useEffect, useState} from 'react';
import TopNav from '../components/TopNav';
import {deleteItem, getItems} from '../api/library';
import Library from '../components/Library';
import {LibraryItem} from '../components/types';


export default function LibraryPage() {
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadItems = async () => {
        setLoading(true);
        const items = await getItems();
        setItems(items);
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            try {
                await loadItems();
            } catch (err) {
                console.error('Failed to load items:', err);
            }
        })();
    }, []);

    const handleUpload = async (item: LibraryItem) => {
        setItems(prev => {
            // Ensure we find item by actual ID
            const idx = prev.findIndex(i => i.id === item.id);
            if (idx !== -1) {
                // Update in place
                const newItems = [...prev];
                newItems[idx] = item;
                return newItems;
            } else {
                // Add new item
                return [item, ...prev];
            }
        });
    };

    const handleDelete = async (id: string) => {
        await deleteItem(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="w-full">
            <TopNav/>

            {/* Page content - constrained */}
            <main className="max-w-7xl mx-auto px-4 mt-[54px]">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Library
                        items={items}
                        onUpload={handleUpload}
                        onDelete={handleDelete}
                        onEdit={handleUpload}
                    />
                )}
            </main>
        </div>
    );
}
