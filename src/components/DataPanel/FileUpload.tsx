import React, { useCallback } from 'react';
import { useDataStore } from '@/store/dataStore';
import { analyzeColumns } from '@/utils/dataAnalysis';
import Papa from 'papaparse';

const FileUpload: React.FC = () => {
  const { setData, setColumns, setLoading } = useDataStore();

  const handleFileDrop = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      setLoading(true);

      try {
        const text = await file.text();
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const { data, meta } = results;
            setData(data);
            const columnAnalysis = analyzeColumns(data, meta.fields || []);
            setColumns(columnAnalysis);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing file:', error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error reading file:', error);
        setLoading(false);
      }
    },
    [setData, setColumns, setLoading]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileDrop(e.dataTransfer.files);
    },
    [handleFileDrop]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg
        p-6 mb-4 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500
        transition-colors duration-200"
    >
      <input
        type="file"
        accept=".csv,.xlsx,.json,.geojson,.zip,.gpkg"
        onChange={(e) => handleFileDrop(e.target.files)}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag and drop your files here or click to select
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Supported formats: CSV, Excel, JSON, GeoJSON, Shapefile, GeoPackage
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;