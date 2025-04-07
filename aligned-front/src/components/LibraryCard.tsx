import React from 'react';
import ReactPlayer from 'react-player/youtube';
import {LibraryItem} from './types';

interface Props {
    item: LibraryItem;
    onDelete: (id: string) => void;
    onEdit: (item: LibraryItem) => void;
}

const LibraryCard: React.FC<Props> = ({item, onDelete, onEdit}) => {
    const isYoutube = item.type === 'youtube';

    return (
        <div
            className="w-[250px] h-[196px] flex items-center justify-center group"
            onClick={() => {
                if (item.type === 'link') {
                    window.open(item.url, '_blank');
                }
            }}
            role={item.type === 'link' ? 'button' : undefined}
            tabIndex={item.type === 'link' ? 0 : undefined}
        >
            <div
                className="w-[228px] h-[174px] flex flex-col rounded-[8px] border border-[#A9B5DB] bg-white overflow-hidden transition-all duration-200"
                style={{
                    filter: 'drop-shadow(0px 0px 16px rgba(172, 181, 212, 0.3))',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.filter =
                        'drop-shadow(0px 0px 16px rgba(169, 181, 219, 0.75))';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter =
                        'drop-shadow(0px 0px 16px rgba(172, 181, 212, 0.3))';
                }}
            >
                {/* Top media section */}
                <div className="relative w-full aspect-[18/9] bg-[#3E7BFA]">
                    {isYoutube ? (
                        <ReactPlayer
                            url={item.url}
                            playing
                            controls
                            width="100%"
                            height="100%"
                            className="react-player absolute top-0 left-0"
                        />
                    ) : (
                        <img
                            src="/assets/link.svg"
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Hover controls */}
                    <div
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <div
                            className="w-[80px] h-[27px] flex items-center justify-between px-[4px] py-[3px] rounded border border-[#7C8DC1] bg-[#EFF3FA]/80 backdrop-blur-sm">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(item.url, '_blank')
                                }}
                                title="Open"
                                className="w-[18px] h-[18px] flex items-center justify-center p-0 m-0"
                            >
                                <img src="/assets/link-control-open.svg" alt="Open"/>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(item)
                                }}
                                title="Edit"
                                className="w-[18px] h-[18px] flex items-center justify-center p-0 m-0"
                            >
                                <img src="/assets/link-control-edit.svg" alt="Edit"/>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item.id)
                                }}
                                title="Delete"
                                className="w-[18px] h-[18px] flex items-center justify-center p-0 m-0"
                            >
                                <img src="/assets/link-control-delete.svg" alt="Delete"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom text section */}
                <div className="flex flex-col justify-between px-3 pt-3 pb-[10px] h-full">
                    <div className="flex justify-between items-center mb-[2px]">
                        <h3 className="text-[#3E4867] text-[14px] leading-[18px] font-semibold font-['Nunito_Sans'] truncate">
                            {item.name}
                        </h3>
                        {item.type.toLowerCase() === 'youtube' ? (
                            <span
                                className="flex justify-center items-center w-[22px] h-[22px] rounded-full text-white text-[10px] leading-[14px] font-bold font-['Nunito_Sans'] bg-purple-600">
                ON
              </span>
                        ) : (
                            <div
                                className="w-[22px] h-[22px] rounded-full bg-center bg-cover bg-no-repeat shadow-[0_0_16px_rgba(172,181,212,0.3)]"
                                style={{backgroundImage: `url('/avatars/card-link.jpg')`}}
                            />
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-[#7C8DC1] text-[12px] leading-[14px] font-bold font-['Nunito_Sans']">
                            Case Studies
                        </div>
                        <div
                            className="text-[#3E4867] text-[12px] leading-[14px] font-bold font-['Nunito_Sans'] uppercase">
                            {item.type}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;
