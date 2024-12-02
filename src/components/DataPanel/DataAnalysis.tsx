import React from 'react';
import { useDataStore } from '@/store/dataStore';

const DataAnalysis: React.FC = () => {
  const { columns } = useDataStore();

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Column Analysis
      </h3>
      <div className="space-y-2">
        {columns.map((col) => (
          <div
            key={col.name}
            className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {col.name}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  col.confidence > 0.8
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : col.confidence > 0.5
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                }`}
              >
                {col.type}
              </span>
            </div>
            {col.statistics && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {col.statistics.missing !== undefined && (
                  <span className="mr-2">
                    Missing: {col.statistics.missing}%
                  </span>
                )}
                {col.statistics.mean !== undefined && (
                  <span className="mr-2">
                    Mean: {col.statistics.mean.toFixed(2)}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAnalysis;