import { useState } from "react";
import excel from "../Assets/excel.png";
import CallRecords from "./Callrecords";

const ExportButton = ({ records, exportToExcel }) => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle export
  const handleExport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.callTime);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return recordDate >= start && recordDate <= end;
    });

    if (filteredRecords.length === 0) {
      alert("No records found for the selected date range.");
      return;
    }

    exportToExcel(filteredRecords); // Pass filtered records to the export function
    setShowDateModal(false); // Close the modal
  };

  return (
    <>
      {/* Export to Excel Button */}
      <button
        onClick={() => setShowDateModal(true)}
        className="px-4 py-2 ml-3 flex font-semibold justify-center h-12 items-center rounded-md bg-green-600 text-white hover:bg-green-700"
      >
        <img src={excel} className="mr-2" alt="Excel Icon" />
        Export to Excel
      </button>

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportButton;
