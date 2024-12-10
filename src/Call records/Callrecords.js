import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import axios from "axios";

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
 

  // Fetch call records from the backend
  useEffect(() => {
    if (activeTab === "view") {
      axios
        .get("http://localhost:5000/api/call-records")
        .then((response) => {
          setCallRecords(response.data);
          setFilteredRecords(response.data);
        })
        .catch((error) => console.error("Error fetching call records:", error));
    }
  }, [activeTab]);

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
      .post("http://localhost:5000/api/call-records", updatedFormData)
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
  
    setFilteredRecords(filtered);
    setFilterMenuVisible(false);
  };
  

  const clearFilters = () => {
    setFilters({
      typeOfService: "",
      date: "",
      company: "",
      serialNumber: "",
    });
    setFilteredRecords(callRecords);
    setFilterMenuVisible(false);
  };

  // Handle Change Assigned To
  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:5000/api/call-records/${id}`)
      .then((response) => {
        console.log("Call record deleted:", response.data);
        // Remove the deleted record from the filtered records and callRecords state
        setFilteredRecords(filteredRecords.filter((record) => record._id !== id));
        setCallRecords(callRecords.filter((record) => record._id !== id));
      })
      .catch((error) => console.error("Error deleting call record:", error));
  };
  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/api/call-records/${id}/status`, { statusOfCall: newStatus })
      .then((response) => {
        console.log("Status updated:", response.data);
        // Update the local state with the new status
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
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const changeAssignedTo = (id, newAssignee) => {
    axios
      .put(`http://localhost:5000/api/call-records/${id}`, { assignedTo: newAssignee })
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




  return (
    <div className="min-h-screen bg-white py-10">
      <Navbar />
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
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
        <div className="grid grid-cols-3  justify-center">
          <div className="col-span-1 justify-center text-center ml-32 items-center">
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

          <div className="col-span-2">
            {activeTab === "add" && (
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300">
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
                <div>
                  <label htmlFor="callTime" className="block text-gray-700 font-medium">Call Time</label>
                  <input
                    type="datetime-local"
                    name="callTime"
                    id="callTime"
                    value={formData.callTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
            
                {/* Type of Service */}
                <div>
                  <label htmlFor="typeOfService" className="block text-gray-700 font-medium">Type of Service</label>
                  <input
                    type="text"
                    name="typeOfService"
                    id="typeOfService"
                    placeholder="Type of Service"
                    value={formData.typeOfService}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
            
                {/* Reason */}
                <div>
                  <label htmlFor="reason" className="block text-gray-700 font-medium">Reason</label>
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
                    <label htmlFor="tokenNumber" className="block text-gray-700 font-medium">Call Count</label>
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
            
              
            )};

            {activeTab === "view" && (
              <div>
                <div className="mb-6 max-w-2xl ">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">Filter Call Records</h2>
                  <div className="flex justify-center mt-4">
  <button
    onClick={() => setFilterMenuVisible(!filterMenuVisible)}
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
  >
    Filter
  </button>
 
</div>

{filterMenuVisible && (
  <div className="absolute z-10 bg-white p-6 rounded-md shadow-md mt-2 w-96 border">
    <div className="space-y-4">
      <input
                          type="text"
                          name="typeOfService"
                          placeholder="Type of Service"
                          value={filters.typeOfService}
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
      
      {/* Assigned To filter */}
      <input
        type="text"
        name="assignedTo"
        placeholder="Assigned To"
        value={filters.assignedTo}
        onChange={handleFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />

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

                </div>

                <div className=" max-w-3xl ml-20 overflow-hidden bg-white ring-1 ring-indigo-500 shadow sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                  <div className="max-h-[700px] overflow-y-auto relative">
                  {filteredRecords.map((record) => (
  <div key={record._id} className="px-4 py-4 sm:px-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-lg font-semibold text-gray-900">{record.callerName}</p>
        <p className="text-sm text-gray-500">Phone: {record.phoneNumber}</p>
        <p className="text-sm text-gray-500">Company: {record.company}</p>
        <p className="text-sm text-gray-500">Serial Number: {record.serialNumber}</p>
        <p className="text-sm text-gray-500">Type Of Service: {record.typeOfService}</p>
        <p className="text-sm text-gray-500">Reason: {record.reason}</p>
        <p className="text-sm text-gray-500">Assigned to: {record.assignedTo}</p>
        <p className="text-sm text-gray-500">Status: <span className={`px-2 py-1 rounded ${record.statusOfCall === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{record.statusOfCall}</span></p>
        <p className="text-sm text-gray-500">Token num: {record.tokenNumber}</p>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowOptionsForRecord(showOptionsForRecord === record._id ? null : record._id)}
          className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-gray-300"
        >
          Options
        </button>

        {showOptionsForRecord === record._id && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-10">
            <button
              onClick={() => deleteRecord(record._id)}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => updateStatus(record._id, record.statusOfCall === "Incomplete" ? "Complete" : "Incomplete")}
              className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
            >
              Mark as {record.statusOfCall === "Incomplete" ? "Complete" : "Incomplete"}
            </button>
            <div className="block w-full px-4 py-2 text-left text-sm text-indigo-600">
              <select
                onChange={(e) => changeAssignedTo(record._id, e.target.value)}
                className="w-full px-3 py-1 bg-gray-100 rounded-md"
              >
                <option value="">Change Assigned To</option>
                <option value="Person 1">Person 1</option>
                <option value="Person 2">Person 2</option>
                <option value="Person 3">Person 3</option>
              </select>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallRecords;
