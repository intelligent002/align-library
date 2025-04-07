import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center border rounded-md px-2 py-1 w-64 bg-white">
      <FiSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search Item..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full outline-none"
      />
    </div>
  );
};

export default SearchBar;