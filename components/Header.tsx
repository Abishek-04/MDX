
import React from 'react';
import { ClearIcon } from './Icons';

interface HeaderProps {
    onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-gray-700">
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Zudoku MDX Converter
        </h1>
        <p className="text-gray-400 mt-1">
          Instantly convert your notes to clean, ready-to-use MDX.
        </p>
      </div>
      <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        <ClearIcon className="w-5 h-5" />
        <span>Clear All</span>
      </button>
    </header>
  );
};
