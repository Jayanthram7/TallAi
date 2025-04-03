import React, { useState, useEffect } from "react";
import Navbar1 from "../Home/NavbarAdmin";
import axios from "axios";
import { useEfect, useRef } from "react";
import excel from "../Assets/excel.png";
import * as XLSX from "xlsx";

const CallRecords = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    callerName: "",
    company: "",
    serialNumber: "",
    callTime: "",
    reason: "",
    typeOfService: "",
    assignedTo: "",
    tokenNumber: "",
    email: "", // New email field
    statusOfCall: "Incomplete", // Default value
  });

  const [callRecords, setCallRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filters, setFilters] = useState({
    typeOfService: "",
    date: "",
    company: "",
    serialNumber: "",
    assignedTo: "",
  });

  const [activeTab, setActiveTab] = useState("add");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [showOptionsForRecord, setShowOptionsForRecord] = useState(null);
  const [sortedColumn, setSortedColumn] = useState("callTime");  // Column to sort by
  const [sortOrder, setSortOrder] = useState("desc");     // Order of sorting: "asc" or "desc"
  const handleSort = (column) => {
    if (sortedColumn === column) {
      // If the column is already sorted, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, reset the order to ascending
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };
  const sortedRecords = filteredRecords.sort((a, b) => {
    if (sortedColumn) {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });
  const renderSortArrow = (column) => {
    if (sortedColumn === column) {
      return sortOrder === "asc" ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    return null;
  };
  



  // Fetch call records from the backend
  useEffect(() => {
    if (activeTab === "view") {
      axios
        .get("https://backend-copy-1.onrender.com/api/call-records")
        .then((response) => {
          setCallRecords(response.data);
          setFilteredRecords(response.data);
        })
        .catch((error) => console.error("Error fetching call records:", error));
    }
  }, [activeTab]);
  const [editingStatus, setEditingStatus] = useState(null);
const [statusInput, setStatusInput] = useState("");

// Function to handle status update
const updateStatus = (id, newStatus) => {
  // Update the record's status in your database or state
  console.log(`Updating record ${id} with new status: ${newStatus}`);
  setEditingStatus(null);
  setStatusInput("");
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Prepend today's date to the token number
    const tokenPrefix = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const tokenWithDate = `${tokenPrefix}-${formData.tokenNumber}`;
  
    // Update the formData to include the token number with the date prefix
    const updatedFormData = { ...formData, tokenNumber: tokenWithDate };
  
    axios
      .post("https://backend-copy-1.onrender.com/api/call-records", updatedFormData)
      .then((response) => {
        console.log("Call record added:", response.data);
        setFormData({
          phoneNumber: "",
          callerName: "",
          company: "",
          serialNumber: "",
          callTime: "",
          reason: "",
          typeOfService: "",
          assignedTo: "",
          tokenNumber: "",
          email: "", // New email field
          statusOfCall: "Incomplete",
        });
        setActiveTab("view"); // Switch to 'view' tab after adding the record
      })
      .catch((error) => console.error("Error adding call record:", error));
  };
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = callRecords;
  
    if (filters.typeOfService) {
      filtered = filtered.filter((record) =>
        record.typeOfService.toLowerCase().includes(filters.typeOfService.toLowerCase())
      );
    }
  
    if (filters.date) {
      filtered = filtered.filter(
        (record) => new Date(record.callTime).toDateString() === new Date(filters.date).toDateString()
      );
    }
  
    if (filters.company) {
      filtered = filtered.filter((record) =>
        record.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }
  
    if (filters.serialNumber) {
      filtered = filtered.filter((record) =>
        record.serialNumber.includes(filters.serialNumber)
      );
    }
  
    if (filters.assignedTo) {
      filtered = filtered.filter((record) =>
        record.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())
      );
    }
  
    if (filters.statusOfCall) {
      if (filters.statusOfCall === "Complete") {
        filtered = filtered.filter((record) => record.statusOfCall === "Complete");
      } else if (filters.statusOfCall === "Incomplete") {
        filtered = filtered.filter((record) => record.statusOfCall === "Incomplete");
      } else if (filters.statusOfCall === "Requested") {
        filtered = filtered.filter((record) => record.statusOfCall === "Requested");
      } else if (filters.statusOfCall === "To Bill") {
        filtered = filtered.filter((record) => record.statusOfCall === "To Bill");
      } else if (filters.statusOfCall === "Others") {
        filtered = filtered.filter(
          (record) => record.statusOfCall !== "Complete" && record.statusOfCall !== "Incomplete"
        );
      }
    }
  
    setFilteredRecords(filtered);
    setFilterMenuVisible(false);
  };
  const isFilterApplied = Object.keys(filters).length > 0;
  const jisFilterApplied = Boolean(filters.length); // Assuming activeFilters is an array of applied filters
  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 15;

// Calculate total pages
const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

// Get records for the current page
const paginatedRecords = sortedRecords.slice(
  (currentPage - 1) * recordsPerPage,
  currentPage * recordsPerPage
);

// Function to handle page changes
const handlePageChange = (page) => {
  if (page > 0 && page <= totalPages) {
    setCurrentPage(page);
  }
};
const [showDateModal, setShowDateModal] = useState(false);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

// Function to handle export
const handleExport = () => {
  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  const filteredRecords3 = callRecords.filter((record) => {
    const recordDate = new Date(record.callTime);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return recordDate >= start && recordDate <= end;
  });

  if (filteredRecords3.length === 0) {
    alert("No records found for the selected date range.");
    return;
  }
  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = filteredRecords3.map((record, index) => ({
      "Sl. No.": index + 1,
      Company: record.company,
      "Caller Name": record.callerName,
      "Phone Number": record.phoneNumber,
      "Serial Number": record.serialNumber,
      "Email": record.email,
      "Type of Service": record.typeOfService,
      "Assigned To": record.assignedTo,
      Date: formatDate(record.callTime),
      Status: record.statusOfCall,
    }));
  
    // Add the data to the worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Call Records");
  
    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "Call_Records.xlsx");
  };

  exportToExcel(filteredRecords3); // Pass filtered records to the export function
  setShowDateModal(false); // Close the modal
};

  
  
  

  const clearFilters = () => {
    setFilters({
      typeOfService: "",
      date: "",
      company: "",
      serialNumber: "",
      assignedTo: "",
      statusOfCall: "", // Reset the status filter
    });
    setFilteredRecords(callRecords);
    setFilterMenuVisible(false);
  };
  

  // Handle Change Assigned To
  const deleteRecord = (id) => {
    axios
      .delete(`https://backend-copy-1.onrender.com/api/call-records/${id}`)
      .then((response) => {
        console.log("Call record deleted:", response.data);
        // Remove the deleted record from the filtered records and callRecords state
        setFilteredRecords(filteredRecords.filter((record) => record._id !== id));
        setCallRecords(callRecords.filter((record) => record._id !== id));
      })
      .catch((error) => console.error("Error deleting call record:", error));
  };
  

  const changeAssignedTo = (id, newAssignee) => {
    axios
      .put(`https://backend-copy-1.onrender.com/api/call-records/${id}`, { assignedTo: newAssignee })
      .then((response) => {
        console.log("Assigned to updated:", response.data);
        setCallRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === id ? { ...record, assignedTo: newAssignee } : record
          )
        );
        setFilteredRecords((prevFiltered) =>
          prevFiltered.map((record) =>
            record._id === id ? { ...record, assignedTo: newAssignee } : record
          )
        );
      })
      .catch((error) => console.error("Error updating assigned to:", error));
  };
  const changeStatusOfCall = (id, newStatus) => {
    axios
      .put(`https://backend-copy-1.onrender.com/api/call-records/${id}`, { statusOfCall: newStatus })
      .then((response) => {
        console.log("Status updated:", response.data);
  
        // Update local state to reflect the changes
        setCallRecords((prevRecords) =>
          prevRecords.map((record) =>
            record._id === id ? { ...record, statusOfCall: newStatus } : record
          )
        );
        setFilteredRecords((prevFiltered) =>
          prevFiltered.map((record) =>
            record._id === id ? { ...record, statusOfCall: newStatus } : record
          )
        );
  
        setEditingStatus(null); // Close the input field
      })
      .catch((error) => console.error("Error updating status:", error));
  };
  const [activeView, setActiveView] = useState("table"); // Track the current view (either "record" or "table")

const handleViewToggle = (view) => {
  setActiveView(view);
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
const [sortBy, setSortBy] = useState('callTime'); // Default to sorting by callTime

const handleSortChange = (field) => {
  setSortBy(field); // Update the sortBy state based on the selected field
};


const applySort = () => {
  let sortedRecords = [...filteredRecords];

  if (sortBy === 'date-asc') {
    sortedRecords = sortedRecords.sort((a, b) => new Date(a.callTime) - new Date(b.callTime));
  } else if (sortBy === 'date-desc') {
    sortedRecords = sortedRecords.sort((a, b) => new Date(b.callTime) - new Date(a.callTime));
  } else if (sortBy === 'status-complete') {
    sortedRecords = sortedRecords.sort((a, b) => (a.statusOfCall === 'Complete' ? -1 : 1));
  } else if (sortBy === 'status-incomplete') {
    sortedRecords = sortedRecords.sort((a, b) => (a.statusOfCall === 'Incomplete' ? -1 : 1));
  } else if (sortBy === 'status-others') {
    sortedRecords = sortedRecords.sort((a, b) => (a.statusOfCall !== 'Complete' && a.statusOfCall !== 'Incomplete' ? -1 : 1));
  }

  // Set sorted records
  setFilteredRecords(sortedRecords);

  // Close the sort menu after applying the sort
  setSortMenuVisible(false);
};

const clearSort = () => {
  setSortBy('');  // Reset the sorting option
  setFilteredRecords([...filteredRecords]);  // Reset to original records without sorting
  setSortMenuVisible(false); // Optionally close the sort menu
};
const [sortMenuVisible, setSortMenuVisible] = useState(false);
const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptionsForRecord(null);
      }
    };

    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('company'); // Default search by company

  // Search handling function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  // Filtered records based on search
  const filteredRecords1 = callRecords.filter((record) => {
    const searchValue = searchQuery.toLowerCase();
    if (searchBy === 'company') {
      return record.company && record.company.toLowerCase().includes(searchValue);
    }
    if (searchBy === 'phoneNumber') {
      return record.phoneNumber && record.phoneNumber.toLowerCase().includes(searchValue);
    }
    if (searchBy === 'serialNumber') {
      return record.serialNumber && record.serialNumber.toLowerCase().includes(searchValue);
    }
    return false;
  });
  

  



  return (
    <div className="min-h-screen bg-white py-10">
      <Navbar1 />
      <div className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-20 lg:overflow-visible lg:px-0">
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-100">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
        <div className="grid grid-cols-12  justify-center">
          <div className="col-span-3 justify-center text-center ml-20 items-center">
            <h1 className="justify-center mt-48 text-center text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Call <span className="text-indigo-500">Center.</span>
            </h1>
            <p className="mt-2 justify-center text-center text-xl font-light text-black sm:text-xl">
              Log and view your Call entries
            </p>
            <div className="flex justify-center gap-4 mt-3 mb-4">
              <button
                onClick={() => setActiveTab("add")}
                className={`px-7 py-3 font-semibold rounded-md ${
                  activeTab === "add"
                    ? "bg-indigo-600 text-white"
                    : "bg-white ring-1 ring-indigo-500 text-indigo-500"
                }`}
              >
                Add Entry
              </button>
              <button
                onClick={() => setActiveTab("view")}
                className={`px-7 py-3 font-semibold rounded-md ${
                  activeTab === "view"
                    ? "bg-indigo-600 text-white"
                    : "bg-white ring-1 ring-indigo-500 text-indigo-500"
                }`}
              >
                View Entries
              </button>
            </div>
          </div>

          <div className="col-span-9">
            {activeTab === "add" && (
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add Call Record</h2>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Phone Number and Caller Name */}
                <div className="flex space-x-3">
                <div className="flex-1">
                    <label htmlFor="callerName" className="block text-gray-700 font-medium">Caller Name</label>
                    <input
                      type="text"
                      name="callerName"
                      id="callerName"
                      placeholder="Caller Name"
                      value={formData.callerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                </div>
            
                {/* Company and Serial Number */}
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <label htmlFor="company" className="block text-gray-700 font-medium">Company</label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="serialNumber" className="block text-gray-700 font-medium">Serial Number</label>
                    <input
                      type="text"
                      name="serialNumber"
                      id="serialNumber"
                      placeholder="Serial Number"
                      value={formData.serialNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
            
                {/* Call Time */}
                <div className="flex space-x-3">
                <div className="flex-4">
                  <label htmlFor="callTime" className="block text-gray-700 font-medium">Date</label>
                  <input
                    type="datetime-local"
                    name="callTime"
                    id="callTime"
                    value={formData.callTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
  <div className="flex-1">
                  <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                     placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                </div>
            
                {/* Type of Service */}
                <div>
  <label htmlFor="typeOfService" className="block text-gray-700 font-medium">
    Nature of Service
  </label>
  <select
    name="typeOfService"
    id="typeOfService"
    value={formData.typeOfService}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md"
    required
  >
    <option value="" disabled>
      Select a service
    </option>
    <option value="Tally Prime - Silver New">Tally Prime - Silver New</option>
    <option value="Tally Prime - Gold New">Tally Prime - Gold New</option>
    <option value="TSS">TSS</option>
    <option value="TDL">TDL</option>
    <option value="AWS">AWS</option>
    <option value="TS9">TS9</option>
  </select>
</div>

            
                {/* Reason */}
                <div>
                  <label htmlFor="reason" className="block text-gray-700 font-medium">Issue Faced</label>
                  <textarea
                    name="reason"
                    id="reason"
                    placeholder="Reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
            
                {/* Token Number and Assigned Task */}
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <label htmlFor="tokenNumber" className="block text-gray-700 font-medium">Token</label>
                    <input
                      type="text"
                      name="tokenNumber"
                      id="tokenNumber"
                      placeholder="Token Number"
                      value={formData.tokenNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
            
                  <div className="flex-1">
                    <label htmlFor="assignedTo" className="block text-gray-700 font-medium">Assign Task</label>
                    <select
                      name="assignedTo"
                      id="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value=""></option>
                      <option value="Person 1">Person 1</option>
                      <option value="Person 2">Person 2</option>
                      <option value="Person 3">Person 3</option>
                      <option value="Person 4">Person 4</option>
                      <option value="Person 5">Person 5</option>
                    </select>
                  </div>
                </div>
            
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                  Add Entry
                </button>
              </form>
            </div>
            
              
            )}

            {activeTab === "view" && (
              <div>
              {/* View Format Toggle */}
              <div className="flex ml-6  mb-6">
            
              <button
  onClick={() => handleViewToggle("table")}
  className={`flex items-center gap-2 px-4  h-12  rounded-md ${
    activeView === "table"
      ? "bg-indigo-600 text-white"
      : "bg-gray-200 text-gray-600"
  }`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="9" y1="6" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="18" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
  Table View
</button>

<button
  onClick={() => handleViewToggle("record")}
  className={`flex items-center gap-2 px-4 py-2 h-12 ml-3 mr-6 rounded-md ${
    activeView === "record"
      ? "bg-indigo-600 text-white"
      : "bg-gray-200 text-gray-600"
  }`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6M9 16h6" />
  </svg>
  Sheet View
</button>
<div className="flex justify-center items-center h-12 gap-4 mr-6 w-full max-w-lg">
  <div className="flex items-center w-full h-12 border bg-white border-gray-400 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
    {/* Search Icon */}
    <div className="flex items-center px-3 bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a7 7 0 015.657 11.657l3.086 3.086a1 1 0 01-1.414 1.414l-3.086-3.086A7 7 0 1111 4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 16l4 4"
        />
      </svg>
    </div>

    {/* Input Field */}
    <input
      type="text"
      placeholder="Search Entry "
      value={searchQuery}
      onChange={handleSearch}
      className="flex-grow pl-2 pr-2 h-full focus:outline-none placeholder-gray-500"
    />

    {/* Select Dropdown */}
    <select
      value={searchBy}
      onChange={handleSearchByChange}
      className="h-full px-3 border-l border-gray-300 focus:outline-none focus:ring-0 rounded-r-lg"
    >
      <option value="company">Company Name</option>
      <option value="phoneNumber">Phone Number</option>
      <option value="serialNumber">Serial Number</option>
    </select>
  </div>
</div>







                
                <button
  onClick={() => setFilterMenuVisible(!filterMenuVisible)}
  className={`flex items-center gap-2 px-4 h-12 py-2 rounded-md ${
    isFilterApplied
      ? "bg-indigo-600 text-white hover:bg-indigo-500"
      : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100"
  }`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
    />
  </svg>
  Filter
</button>



                  {filterMenuVisible && (
  <div  className="absolute z-10 bg-white p-6 ml-[520px] rounded-md shadow-md mt-2 w-96 border">
    <div className="space-y-4">
    <select
        name="statusOfCall"
        value={filters.statusOfCall}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Status</option>
        <option value="Complete">Complete</option>
        <option value="Incomplete">Incomplete</option>
        <option value="Requested">Requested</option>
        <option value="To Bill">To Bill</option>
        <option value="Others">Others</option>
      </select>
      <input
        type="text"
        name="assignedTo"
        placeholder="Assigned To"
        value={filters.assignedTo}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={filters.company}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="serialNumber"
        placeholder="Serial Number"
        value={filters.serialNumber}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="typeOfService"
        placeholder="Type of Service"
        value={filters.typeOfService}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      {/* Assigned To filter */}
      

      {/* Status Of Call filter */}
      

      <div className="flex justify-between">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
)}
            <button
  onClick={() => setSortMenuVisible(!sortMenuVisible)}
  className="flex items-center gap-1 px-3 ml-3 rounded-md h-12  bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 10l5-5m0 0l5 5M7 14l5 5m0 0l5-5"
    />
  </svg>
  Sort
</button>



      {sortMenuVisible && (
        <div className="absolute z-10 bg-white p-6 ml-[620px] rounded-md shadow-md mt-2 w-96 border">
          <div className="space-y-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Sort By</option>
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="status-complete">Status: Complete First</option>
              <option value="status-incomplete">Status: Incomplete First</option>
              <option value="status-others">Status: Others First</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={applySort}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Apply Sort
              </button>
              <button
                onClick={clearSort}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Clear Sort
              </button>
            </div>
          </div>
        </div>
      )}
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

      
              </div>
              <div className="flex justify-end items-center mr-20 ">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-white text-indigo-600  disabled:text-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>

  <span className="text-sm">
    {currentPage} / {totalPages}
  </span>

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 text-indigo-600 rounded-md disabled:text-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</div>

              
              
          
              {/* Filter Section (Common for both views) */}
              
          
              {/* Conditional Rendering based on activeView */}
              {activeView === "record" && (
  <div>
    <div className="max-w-5xl ml-20 overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="divide-y divide-gray-200">
        <div className="max-h-[700px] overflow-y-auto relative">
          {filteredRecords1.map((record) => (
            <div key={record._id} className="px-4 py-4 sm:px-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{record.company}</p>
                  <p className="text-sm text-gray-500">Phone: {record.phoneNumber}</p>
                  <p className="text-sm font-semibold text-gray-700">Caller Name: {record.callerName}</p>
                  <p className="text-sm text-gray-500">Email: {record.email}</p>

                  <p className="text-sm text-gray-500">Serial Number: {record.serialNumber}</p>
                  <p className="text-sm text-gray-500">Type Of Service: {record.typeOfService}</p>
                  <p className="text-sm text-gray-500">Reason: {record.reason}</p>
                  <p className="text-sm text-gray-500">Assigned to: {record.assignedTo}</p>
                  <p
                    className={`text-sm px-2 py-1 rounded-md ${
                      record.statusOfCall === "Complete"
                        ? "bg-green-500 text-white"
                        : record.statusOfCall === "Incomplete"
                        ? "bg-red-500 text-white"
                        : record.statusOfCall === "Requested"
                        ? "bg-blue-500 text-white"
                        : record.statusOfCall === "To Bill"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    Status: {record.statusOfCall}
                  </p>

                  <p className="text-sm text-gray-500">Token num: {record.tokenNumber}</p>
                  <p className="text-sm text-gray-500">Date: {formatDate(record.callTime)}</p>
                </div>

                {/* Options Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowOptionsForRecord(showOptionsForRecord === record._id ? null : record._id)}
                    className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                  >
                    Options
                  </button>

                  {showOptionsForRecord === record._id && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-10">
                      <button
                        onClick={() => setEditingStatus(record._id)}
                        className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Change status
                      </button>
                      {editingStatus === record._id && (
                        <div className="block w-full px-4 py-2 text-left text-sm">
                          <input
                            type="text"
                            placeholder="Enter new status"
                            className="w-full px-3 py-1 border rounded-md"
                            value={statusInput}
                            onChange={(e) => setStatusInput(e.target.value)}
                          />
                          <button
                            onClick={() => changeStatusOfCall(record._id, statusInput)}
                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Save
                          </button>
                        </div>
                      )}

                      <div className="block w-full px-4 py-2 text-left text-sm text-indigo-600">
                        Change Assigned To
                        <select
                          onChange={(e) => changeAssignedTo(record._id, e.target.value)}
                          className="w-full px-3 py-1 bg-gray-100 rounded-md"
                        >
                          <option value=""></option>
                          <option value="Person 1">Person 1</option>
                          <option value="Person 2">Person 2</option>
                          <option value="Person 3">Person 3</option>
                          <option value="Person 4">Person 4</option>
                          <option value="Person 5">Person 5</option>
                        </select>
                      </div>
                      <button
                        onClick={() => changeStatusOfCall(record._id, "Complete")}
                        className="block w-full px-4 py-2 text-left text-sm text-green-500 bg-white rounded-md hover:bg-gray-100"
                      >
                        Mark Call as Completed
                      </button>

                      <button
                        onClick={() => deleteRecord(record._id)}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

          
              {/* Table View */}
              {activeView === "table" && (
  <div className="overflow-x-auto ">
    <div className="">
    {/* Search Section */}
    

    <table className="min-w-6xl ml-10 bg-white shadow-md rounded-lg">
      <thead className="bg-indigo-700 bg-opacity-85 text-white rounded-xl">
        <tr>
          <th className="px-2 py-1 text-left border-r font-medium">Sl. No.</th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("company")}
          >
            Company {renderSortArrow("company")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("callerName")}
          >
            Caller Name {renderSortArrow("callerName")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("phoneNumber")}
          >
            Phone Number {renderSortArrow("phoneNumber")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("serialNumber")}
          >
            Serial Number {renderSortArrow("serialNumber")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("typeOfService")}
          >
            Type of Service {renderSortArrow("typeOfService")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("assignedTo")}
          >
            Assigned To {renderSortArrow("assignedTo")}
          </th>
          <th
            className="px-2 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("callTime")}
          >
            Date {renderSortArrow("callTime")}
          </th>
          <th
            className="px-3 py-1 text-left border-r font-medium cursor-pointer"
            onClick={() => handleSort("statusOfCall")}
          >
            Status {renderSortArrow("statusOfCall")}
          </th>
        </tr>
      </thead>
      <tbody>
        {paginatedRecords
          .filter((record) => {
            const searchValue = searchQuery.toLowerCase();
            if (searchBy === "company") {
              return record.company && record.company.toLowerCase().includes(searchValue);
            }
            if (searchBy === "phoneNumber") {
              return record.phoneNumber && record.phoneNumber.toLowerCase().includes(searchValue);
            }
            if (searchBy === "serialNumber") {
              return record.serialNumber && record.serialNumber.toLowerCase().includes(searchValue);
            }
            return true;
          })
          .map((record, index) => (
            <tr
              key={record._id}
              className="hover:text-indigo-600 overflow-y-auto max-h-[600px] hover:font-semibold hover:border-l-indigo-600 hover:z-auto transition ease-in-out"
            >
              <td className="px-2 py-1 font-semibold border-t">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>

              <td className="px-2 py-1 font-semibold border-t">{record.company}</td>
              <td className="px-2 py-1 border-t">{record.callerName}</td>
              <td className="px-2 py-1 border-t">{record.phoneNumber}</td>
              <td className="px-2 py-1 border-t">{record.serialNumber}</td>
              <td className="px-2 py-1 border-t">{record.typeOfService}</td>
              <td className="px-2 py-1 border-t">{record.assignedTo}</td>
              <td className="px-2 py-1 border-t">{formatDate(record.callTime)}</td>
              <td
                className={`px-3 py-1 border-t text-sm ${
                  record.statusOfCall === "Complete"
                    ? "text-green-600 bg-green-100"
                    : record.statusOfCall === "Incomplete"
                    ? "text-red-600 bg-red-100"
                    : record.statusOfCall === "To Bill"
                    ? "text-orange-600 bg-orange-100"
                    : record.statusOfCall === "Requested"
                    ? "text-indigo-600 bg-indigo-100"
                    : "text-yellow-800 bg-yellow-100"
                }`}
              >
                {record.statusOfCall}
              </td>
              <td className="relative px-3 py-1">
                <button
                  onClick={() =>
                    setShowOptionsForRecord(
                      showOptionsForRecord === record._id ? null : record._id
                    )
                  }
                  className="flex items-center gap-2 px-3 py-1 text-indigo-600 border-none shadow-none rounded-md hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4.125.458.458-4.125L16.862 3.487z"
                    />
                  </svg>
                </button>

                {/* Options Menu */}
                {showOptionsForRecord === record._id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-6 w-48 bg-white rounded-md shadow-lg z-50"
                    style={{ transform: "translateY(-50%)" }}
                  >
                    <button
                      onClick={() => setEditingStatus(record._id)}
                      className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                    >
                      Change status
                    </button>
                    {editingStatus === record._id && (
                      <div className="block w-full px-4 py-2 text-left text-sm">
                        <input
                          type="text"
                          placeholder="Enter new status"
                          className="w-full px-3 py-1 border rounded-md"
                          value={statusInput}
                          onChange={(e) => setStatusInput(e.target.value)}
                        />
                        <button
                          onClick={() => changeStatusOfCall(record._id, statusInput)}
                          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    )}

                    <div className="block w-full px-4 py-2 text-left text-sm text-indigo-600">
                      Change Assigned To
                      <select
                        onChange={(e) => changeAssignedTo(record._id, e.target.value)}
                        className="w-full px-3 py-1 bg-gray-100 rounded-md"
                      >
                        <option value=""></option>
                        <option value="Person 1">Person 1</option>
                        <option value="Person 2">Person 2</option>
                        <option value="Person 3">Person 3</option>
                        <option value="Person 4">Person 4</option>
                        <option value="Person 5">Person 5</option>
                      </select>
                    </div>
                    <button
                      onClick={() => changeStatusOfCall(record._id, "To Bill")}
                      className="block w-full px-4 py-2 text-left text-sm text-orange-500 bg-white rounded-md hover:bg-gray-100"
                    >
                      To be billed
                    </button>
                    <button
  onClick={() => {
    // Validation to check if any field is empty
    const isAnyFieldEmpty = !record.company ||
      !record.callerName ||
      !record.phoneNumber ||
      !record.serialNumber ||
      !record.typeOfService ||
      !record.assignedTo ||
      !record.callTime ||
      !record.statusOfCall;

    if (isAnyFieldEmpty) {
      alert("Please ensure all fields are filled before marking the call as completed.");
      return; // Stop further execution
    }

    // Proceed to change status if validation passes
    changeStatusOfCall(record._id, "Complete");
  }}
  className="block w-full px-4 py-2 text-left text-sm text-green-500 bg-white rounded-md hover:bg-gray-100"
>
  Mark Call as Completed
</button>


                    <button
                      onClick={() => deleteRecord(record._id)}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-center items-center mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-white text-indigo-600  disabled:text-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>

  <span className="text-sm">
    {currentPage} / {totalPages}
  </span>

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 text-indigo-600 rounded-md disabled:text-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</div>

  </div>
)}

    

            </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CallRecords;
