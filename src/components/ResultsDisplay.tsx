import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

interface ResultsDisplayProps {
  mode: 'light' | 'dark';
}

export default function ResultsDisplay({ mode }: ResultsDisplayProps) {
  const { results, isLoading, error } = useSelector((state: RootState) => state.query);
  const [chartType, setChartType] = React.useState<'line' | 'area'>('line');

  if (isLoading) {
    return (
      <div className={`w-full h-96 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center`}>
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Processing your query...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-96 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center`}>
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600 font-medium">{error}</p>
        <p className={`mt-2 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Please try another query</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className={`w-full h-96 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center`}>
        <p className={`mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Enter a query to see results</p>
        <p className={`text-sm ${mode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Try one of the suggested queries above
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full h-96 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
          Analysis Results
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-md transition-colors ${
              chartType === 'line'
                ? 'bg-blue-500 text-white'
                : mode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded-md transition-colors ${
              chartType === 'area'
                ? 'bg-blue-500 text-white'
                : mode === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Area
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={results}>
          <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="name" 
            stroke={mode === 'dark' ? '#9CA3AF' : '#4B5563'}
          />
          <YAxis 
            stroke={mode === 'dark' ? '#9CA3AF' : '#4B5563'}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: mode === 'dark' ? '#1F2937' : 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              color: mode === 'dark' ? '#F3F4F6' : '#1F2937',
            }}
          />
          <Legend />
          <Line
            type={chartType === 'line' ? 'monotone' : 'basis'}
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6' }}
            name="Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}