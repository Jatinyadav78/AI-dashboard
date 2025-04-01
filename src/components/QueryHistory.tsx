import React from 'react';
import { History, Trash2, RefreshCw } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentQuery } from '../store/querySlice';

interface QueryHistoryProps {
  mode: 'light' | 'dark';
}

export default function QueryHistory({ mode }: QueryHistoryProps) {
  const dispatch = useDispatch();
  const { queryHistory } = useSelector((state: RootState) => state.query);
  const [isHovered, setIsHovered] = React.useState<number | null>(null);

  if (queryHistory.length === 0) {
    return (
      <div className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
        <div className="flex items-center gap-2 mb-4">
          <History className={`h-5 w-5 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
            Recent Queries
          </h2>
        </div>
        <div className="text-center text-gray-500 py-8">
          <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No queries yet</p>
          <p className={`text-sm mt-2 ${mode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            Your query history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className={`h-5 w-5 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
            Recent Queries
          </h2>
        </div>
        <button
          className={`p-1.5 rounded-full ${
            mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } transition-colors`}
          title="Clear history"
        >
          <Trash2 className={`h-4 w-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>
      <div className="space-y-2">
        {queryHistory.map((query, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <button
              onClick={() => dispatch(setCurrentQuery(query))}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                mode === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors flex items-center gap-2`}
            >
              <RefreshCw className={`h-4 w-4 ${
                mode === 'dark' ? 'text-gray-400' : 'text-gray-400'
              } ${isHovered === index ? 'animate-spin' : ''}`} />
              <span className={`line-clamp-1 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {query}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}