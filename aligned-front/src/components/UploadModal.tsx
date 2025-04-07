import React, {useEffect, useRef, useState} from 'react';
import {LibraryItem} from './types';
import {addItem, updateItem} from "../api/library";

interface Props {
    open: boolean;
    isEditing: boolean;
    item?: LibraryItem;
    onClose?: () => void;
    onUpload: (item: LibraryItem) => void;
    onCancel?: () => void;
}

const UploadModal: React.FC<Props> = ({open, item, isEditing, onClose, onUpload}) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState<'youtube' | 'link'>('link');
    const [touched, setTouched] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setUrl(item.url);
            setType(item.type);
            setTouched(false);
        } else if (open) {
            // Only reset when modal is reopened in create mode
            setName('');
            setUrl('');
            setType('link');
            setTouched(false);
        }
    }, [item, open]);

    const validateUrl = (input: string): boolean => {
        const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([\/\w .-]*)*\/?$/i;
        return pattern.test(input);
    };

    const isValidUrl = url ? validateUrl(url) : true;

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-[700px] h-[900px] px-6 pt-[48px] relative"
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
            >
                <div className="max-w-[600px] mx-auto">
                    {/* Title + Close */}
                    <div className="flex justify-between items-start mb-[25px]">
                        <h2 className="text-[22px] leading-[24px] font-bold text-[#3E4867] font-['Nunito_Sans']">
                            {item ? 'Edit' : 'Upload'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[#7C8DC1] text-xl"
                            aria-label="Close"
                        >
                            <img src="/assets/link-edit-close.svg" alt="close"/>
                        </button>
                    </div>

                    {/* Type Selector */}
                    <div className="flex gap-6 mb-[48px]">
                        <div
                            onClick={() => setType('youtube')}
                            className={`flex flex-col items-start cursor-pointer transition-colors ${
                                type === 'youtube' ? 'text-black' : 'text-[#7C8DC1]'
                            }`}
                        >
                            <img
                                src="/assets/link-edit-youtube.svg"
                                alt="YouTube"
                                className="w-[40px] h-[40px] mb-[11px]"
                            />
                            <span className="text-[16px] font-semibold font-['Nunito_Sans'] leading-[20px]">
                YouTube
              </span>
                        </div>

                        <div
                            onClick={() => setType('link')}
                            className={`flex flex-col items-start cursor-pointer transition-colors ${
                                type === 'link' ? 'text-black' : 'text-[#7C8DC1]'
                            }`}
                        >
                            <img
                                src="/assets/link-edit-link.svg"
                                alt="Link"
                                className="w-[40px] h-[40px] mb-[11px]"
                            />
                            <span className="text-[16px] font-semibold font-['Nunito_Sans'] leading-[20px]">
                Link
              </span>
                        </div>
                    </div>

                    {/* URL Title */}
                    <div className="mb-[9px]">
            <span className="block text-[#576694] font-bold font-['Nunito_Sans'] text-[16px] leading-none h-[21px]">
              URL
            </span>
                    </div>

                    {/* URL Input */}
                    <div className="mb-[20px]">
                        <input
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setTouched(true);
                            }}
                            placeholder="e.g. docs.google.com/presentation"
                            className={`w-[600px] h-[35px] px-3 rounded-[6px] 
                ${
                                touched && url && !isValidUrl
                                    ? 'border border-[#EC3323]'
                                    : 'border border-[#A9B5DB]'
                            } 
                text-[#3E4867] text-[16px] leading-[20px] font-semibold font-['Nunito_Sans']
                placeholder-[#A9B5DB] placeholder:font-semibold placeholder:text-[16px] placeholder:leading-[20px] placeholder:font-['Nunito_Sans']`}
                        />
                    </div>

                    {/* Name Title */}
                    <div className="mb-[9px]">
            <span className="block text-[#576694] font-bold font-['Nunito_Sans'] text-[16px] leading-none h-[21px]">
              Name
            </span>
                    </div>

                    {/* Name Input */}
                    <div className="mb-[454px]">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. ACME demo deck"
                            className="w-[600px] h-[35px] px-3 rounded-[6px] border border-[#A9B5DB]
                text-[#3E4867] text-[16px] leading-[20px] font-semibold font-['Nunito_Sans']
                placeholder-[#A9B5DB] placeholder:font-semibold placeholder:text-[16px] placeholder:leading-[20px] placeholder:font-['Nunito_Sans']"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={onClose}
                            className="w-[104px] h-[42px] text-[#3E4867] border border-[#3E4867] rounded-[6px] font-semibold text-sm"
                        >
                            &lt; Back
                        </button>
                        <button
                            onClick={async () => {
                                if (!name || !url) return;

                                try {
                                    let result: LibraryItem;
                                    if (isEditing && item?.id) {
                                        // edit mode
                                        result = await updateItem(item.id, {name, url, type});
                                    } else {
                                        // create mode
                                        result = await addItem({name, url, type});
                                    }

                                    onUpload(result);
                                } catch (error) {
                                    console.error('Failed to save item:', error);
                                }
                            }}
                            disabled={!name || !url}
                            className={`w-[104px] h-[42px] rounded-[6px] text-sm font-semibold ${
                                name && url
                                    ? 'bg-[#7F4EE6] text-white'
                                    : 'bg-[#E0D9F3] text-white cursor-not-allowed'
                            }`}
                        >
                            Save &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
