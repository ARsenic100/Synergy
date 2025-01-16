import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { DataUploadStatus } from '../../types/analysis';

export function DataUploader() {
  const [uploadStatus, setUploadStatus] = useState<DataUploadStatus>({
    total: 0,
    processed: 0,
    failed: 0,
    status: 'idle'
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus({
      total: 100,
      processed: 0,
      failed: 0,
      status: 'uploading'
    });

    // Simulate file processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadStatus(prev => ({
        ...prev,
        processed: progress,
        status: progress < 100 ? 'processing' : 'completed'
      }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Upload School Data</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">
          Upload your UDISE+ data file or drag and drop here
        </p>
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Select File
        </label>
      </div>

      {uploadStatus.status !== 'idle' && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {uploadStatus.status === 'completed' ? 'Processing Complete' : 'Processing Data...'}
            </span>
            {uploadStatus.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-indigo-500" />
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(uploadStatus.processed / uploadStatus.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}