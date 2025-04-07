import React, {useState} from 'react';
import {LibraryItem} from './types';
import LibraryGrid from './LibraryGrid';
import UploadModal from './UploadModal';

interface Props {
    items: LibraryItem[];
    onUpload: (item: LibraryItem) => void;
    onDelete: (id: string) => void;
    onEdit: (item: LibraryItem) => void;
}

const Library: React.FC<Props> = ({items, onUpload, onEdit, onDelete}) => {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<LibraryItem | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (item: LibraryItem) => {
        setEditingItem(item);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleUpload = (item: LibraryItem) => {
        if (editingItem) {
            onEdit(item); // update existing item in parent state
        } else {
            onUpload(item); // add new item
        }

        setShowModal(false);
        setEditingItem(undefined);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(undefined);
    };

    return (
        <section className="px-6 py-10 w-full max-w-[1057px] mx-auto bg-white rounded-md shadow-lg">
            {/* Grid row: 3 columns */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 mb-10">
                {/* Title */}
                <h2 className="text-[22px] leading-[24px] font-bold text-[#3E4867] font-nunito">
                    Library
                </h2>

                {/* Search bar */}
                <div className="justify-self-center w-full max-w-[320px]">
                    <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <img src="/assets/search.svg" alt="search" className="w-[22px] h-[22px]"/>
            </span>
                        <input
                            type="text"
                            placeholder="Search Item..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 font-bold text-[#A9B5DB] text-[16px] font-['Nunito_Sans'] placeholder-[#A9B5DB] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Upload button */}
                <button
                    onClick={() => {
                        setEditingItem(undefined);
                        setIsEditing(false);
                        setShowModal(true);
                    }}
                    className="w-[130px] flex items-center justify-center gap-2 bg-[#8850EA] text-white font-medium px-4 py-2 rounded-md hover:bg-[#783eda]"
                >
                    <img src="/assets/upload.svg" alt="upload"/>
                    Upload
                </button>
            </div>

            {/* Grid content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                <LibraryGrid items={filteredItems} onDelete={onDelete} onEdit={handleEdit}/>
            </div>

            {/* Upload / Edit Modal */}
            <UploadModal
                open={showModal}
                item={editingItem}
                isEditing={isEditing}
                onClose={handleCloseModal}
                onUpload={handleUpload}
            />
        </section>
    );
};

export default Library;
