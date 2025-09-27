
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { ArrowIcon } from './components/Icons';
import { useDebounce } from './hooks/useDebounce';
import { convertToMdx } from './services/geminiService';

const App: React.FC = () => {
  const [rawContent, setRawContent] = useState<string>('');
  const [mdxContent, setMdxContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedRawContent = useDebounce<string>(rawContent, 700);

  const handleConversion = useCallback(async () => {
    if (!debouncedRawContent.trim()) {
      setMdxContent('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await convertToMdx(debouncedRawContent);
      setMdxContent(result);
    } catch (err) {
      setError('Failed to convert content. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedRawContent]);

  useEffect(() => {
    handleConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRawContent]);

  const handleClear = () => {
    setRawContent('');
    setMdxContent('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col p-4 sm:p-6 lg:p-8">
      <Header onClear={handleClear} />
      <main className="flex-grow flex flex-col lg:flex-row gap-6 mt-6">
        <EditorPanel
          title="Your Content"
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          placeholder="Paste your plain text, notes, and content here..."
        />
        <div className="flex justify-center items-center">
          <ArrowIcon className="w-8 h-8 text-gray-500 transform rotate-90 lg:rotate-0" />
        </div>
        <EditorPanel
          title="MDX Output"
          value={mdxContent}
          placeholder="Converted MDX will appear here..."
          readOnly={true}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
