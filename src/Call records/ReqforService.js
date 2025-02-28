import React, { useState, useEffect } from "react";
import Navbar1 from "../Home/NavbarAL";
import axios from "axios";
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
    assignedTo: " ",
    tokenNumber: "",
    email: "",
    statusOfCall: "Requested",
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
  const [lastToken, setLastToken] = useState(""); // State to store the last added token number

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
    const tokenPrefix = new Date().toISOString().split("T")[0];
    const tokenWithDate = `${tokenPrefix}-${formData.tokenNumber}`;

    // Update the formData to include the token number with the date prefix
    const updatedFormData = { ...formData, tokenNumber: tokenWithDate };

    axios
      .post("http://localhost:5000/api/call-records", updatedFormData)
      .then((response) => {
        console.log("Call record added:", response.data);
        setLastToken(tokenWithDate); // Save the token number in the state
        setFormData({
          phoneNumber: "",
          callerName: "",
          company: "",
          serialNumber: "",
          callTime: "",
          reason: "",
          typeOfService: "",
          assignedTo: " ",
          tokenNumber: "",
          email: "",
          statusOfCall: "Requested",
        });
        setActiveTab("view"); // Switch to 'view' tab after adding the record
      })
      .catch((error) => console.error("Error adding call record:", error));
  };

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
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-3 justify-center text-center ml-20 items-center">
            <h1 className="justify-center mt-48 text-center text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Request <span className="text-indigo-500">Service.</span>
            </h1>
            <p className="mt-2 justify-center text-center text-xl font-light text-black sm:text-xl">
              Kindly fill in the form and let us call back.
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
                Request 
              </button>
              <button
                onClick={() => setActiveTab("view")}
                className={`px-7 py-3 font-semibold rounded-md ${
                  activeTab === "view"
                    ? "bg-indigo-600 text-white"
                    : "bg-white ring-1 ring-indigo-500 text-indigo-500"
                }`}
              >
                View Token No.
              </button>
            </div>
          </div>

          <div className="col-span-9">
            {activeTab === "add" && (
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                  Request for Service
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {/* Form Fields */}
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
                    <label htmlFor="tokenNumber" className="block text-gray-700 font-medium">Token No. Enter first 5 digits of serial number</label>
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
            
                  
                </div>
            
                  {/* ... */}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    Request Call Back
                  </button>
                </form>
              </div>
            )}
            {activeTab === "view" && (
  <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Your Token Number
    </h2>
    <p className="text-center text-xl text-gray-700">
      {lastToken ? (
        <>
          <span className="font-semibold text-indigo-600">
            {lastToken}
          </span>
          <br />
          Advent Systems will call you back shortly.
          
        </>
      ) : (
        "No token number available. Please add a new entry."
      )}
    </p>
    <div className="text-center mt-6">
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500"
      >
        Done
      </button>
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
