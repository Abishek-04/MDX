
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';
import { Loader } from './Loader';

interface EditorPanelProps {
  title: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  title,
  value,
  placeholder,
  onChange,
  readOnly = false,
  isLoading = false,
  error = null,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (value) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-lg min-h-[300px] lg:min-h-0">
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
        {readOnly && (
            <button
                onClick={handleCopy}
                disabled={!value || copied}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
        )}
      </div>
      <div className="relative flex-grow">
        <textarea
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full h-full p-4 bg-transparent text-gray-300 placeholder-gray-500 resize-none focus:outline-none ${readOnly ? 'cursor-default' : ''}`}
        />
        {isLoading && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center">
                <Loader />
                <p className="mt-4 text-gray-400">Converting...</p>
            </div>
        )}
        {error && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center p-4">
                <p className="text-center text-red-400">{error}</p>
            </div>
        )}
      </div>
    </div>
  );
};
