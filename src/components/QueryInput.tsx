import React, { useState, useEffect } from 'react';
import { Search, Send, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentQuery, addToHistory, setLoading, setResults } from '../store/querySlice';

interface QueryInputProps {
  mode: 'light' | 'dark';
}

const mockApiCall = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 100)
  }));
};

export default function QueryInput({ mode }: QueryInputProps) {
  const dispatch = useDispatch();
  const { currentQuery, suggestions } = useSelector((state: RootState) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentQuery) {
      setIsTyping(true);
      timeout = setTimeout(() => setIsTyping(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [currentQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;

    setShowSuggestions(false);
    dispatch(setLoading(true));
    dispatch(addToHistory(currentQuery));

    try {
      const results = await mockApiCall(currentQuery);
      dispatch(setResults(results));
    } catch (error) {
      console.error('Error processing query:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center group">
          <Search className={`absolute left-4 h-5 w-5 transition-colors ${isTyping ? 'text-blue-500' : mode === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            ref={inputRef}
            type="text"
            value={currentQuery}
            onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ask anything about your data..."
            className={`w-full pl-12 pr-24 py-3 rounded-lg border ${
              mode === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`}
          />
          {currentQuery && (
            <button
              type="button"
              onClick={() => {
                dispatch(setCurrentQuery(''));
                inputRef.current?.focus();
              }}
              className={`absolute right-12 p-1 rounded-full ${
                mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <X className={`h-4 w-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
            </button>
          )}
          <button
            type="submit"
            disabled={!currentQuery.trim()}
            className={`absolute right-3 p-1 rounded-full ${
              mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } transition-colors disabled:opacity-50`}
          >
            <Send className={`h-5 w-5 ${currentQuery.trim() ? 'text-blue-500' : mode === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 ${
          mode === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-lg border ${
          mode === 'dark' ? 'border-gray-700' : 'border-gray-200'
        } divide-y ${
          mode === 'dark' ? 'divide-gray-700' : 'divide-gray-100'
        }`}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-3 ${
                mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } transition-colors flex items-center gap-2`}
              onClick={() => {
                dispatch(setCurrentQuery(suggestion));
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
            >
              <Search className={`h-4 w-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-400'} flex-shrink-0`} />
              <span className={`line-clamp-1 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}