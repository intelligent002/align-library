import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search Item...' }) => {
  return (
    <div className="justify-self-center w-full max-w-[320px]">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <img src="/assets/search.svg" alt="search" className="w-[22px] h-[22px]" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 font-bold text-[#A9B5DB] text-[16px] font-['Nunito_Sans'] placeholder-[#A9B5DB] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
