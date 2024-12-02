import React from 'react';
import { useDataStore } from '@/store/dataStore';
import FileUpload from './FileUpload';
import DataTable from './DataTable';
import DataAnalysis from './DataAnalysis';

const DataPanel: React.FC = () => {
  const isPanelOpen = useDataStore((state) => state.isPanelOpen);
  const togglePanel = useDataStore((state) => state.togglePanel);

  return (
    <div
      className={`${isPanelOpen ? 'w-96' : 'w-12'} 
        h-full bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out
        border-r border-gray-200 dark:border-gray-700 relative`}
    >
      <button
        onClick={togglePanel}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          rounded-full p-1 shadow-lg z-10"
      >
        <svg
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transform transition-transform
            ${isPanelOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isPanelOpen && (
        <div className="h-full flex flex-col p-4 overflow-hidden">
          <FileUpload />
          <DataAnalysis />
          <DataTable />
        </div>
      )}
    </div>
  );
};

export default DataPanel;