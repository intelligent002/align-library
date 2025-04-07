
import { FiSearch, FiPlus } from 'react-icons/fi';

interface LibraryHeaderProps {
  onUploadClick: () => void;
}

export default function LibraryHeader({ onUploadClick }: LibraryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-xl font-bold text-gray-800">Library</h2>

      <div className="flex flex-1 gap-4 items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Item..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md shadow transition"
        >
          <FiPlus className="text-base" />
          Upload
        </button>
      </div>
    </div>
  );
}
