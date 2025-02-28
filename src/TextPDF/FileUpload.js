// FileUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Navbar from "../Home/NavbarAdmin";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState({});
  const [correctedData, setCorrectedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const config = {
        onUploadProgress: progressEvent => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        }
      };

      const response = await axios.post(
        'http://localhost:5000/api/upload', 
        formData, 
        config
      );

      setExtractedData(response.data);
      setCorrectedData(response.data);
    } catch (err) {
      setError('Failed to process file. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleCorrection = (field, value) => {
    setCorrectedData(prev => ({ ...prev, [field]: value }));
  };

  const saveCorrections = async () => {
    try {
      await axios.post('http://localhost:5000/api/save', correctedData);
      alert('Data saved successfully!');
    } catch (err) {
      setError('Failed to save corrections');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Navbar/>
      <div className="max-w-3xl mt-32 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Invoice / Bill Data Automation
          </h1>

          <form onSubmit={handleFileUpload} className="space-y-6 mb-8">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
                accept=".pdf,.png,.jpg,.jpeg"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-500 hover:text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Choose File
              </label>
              <p className="mt-2 text-sm text-gray-600">
                {file ? file.name : 'No file selected'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, PNG, JPG
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 border-1 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  {uploadProgress === 100 ? 'Processing...' : `Uploading... ${uploadProgress}%`}
                </>
              ) : (
                'Upload & Extract Data'
              )}
            </button>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {Object.keys(extractedData).length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Extracted Data
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(extractedData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      value={correctedData[key] || ''}
                      onChange={(e) => handleCorrection(key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={saveCorrections}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-md transition-colors"
              >
                Save Corrections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;