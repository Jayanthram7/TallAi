import React, { useState } from 'react';
import Google from '../Assets/google.svg.svg';
import Apple from '../Assets/apple.svg.svg';
import TallAi from '../Assets/TallAi.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    serialNumber: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate('/');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Signup Form */}
      <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center px-12">
        <h1 className="text-3xl flex font-bold mb-4">
          Register for TallAi
          <img src={TallAi} className="w-10 h-10 ml-2" alt="TallAi Logo" />
        </h1>
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center justify-center w-full py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
            <img src={Google} className="w-8 h-8 mr-1" alt="Google Icon" /> Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
            <img src={Apple} alt="Apple Icon" className="w-5 h-5 mr-2" />
            Sign up with Apple
          </button>
        </div>
        <div className="text-center text-gray-400 mb-6">or</div>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-row space-x-6">
            <div>
              <label className="block text-lg font-medium mb-2">What should we call you?</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mr / Mrs . John Doe"
                className="w-full px-8 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. TallAi"
                className="w-full px-6 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="e.g. 123456789"
                className="w-full px-6 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <div>
              <label className="block text-lg font-medium mb-2">Your email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-40 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 7373458585"
                className="w-full px-6 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Set password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 mb-6 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-normal">
            Create an account
          </button>
        </form>
        <p className="mt-4 text-base text-gray-400">
  Already have an account? 
  <Link to="/signin" className="text-blue-500">
    Login here
  </Link>
</p>
      </div>
      <div className="w-1/2 bg-gradient-to-b from-indigo-400 to-indigo-900 text-white flex flex-col justify-center px-12">
      
      <div className='flex  items-center'>
      <img src={TallAi} className='w-16 h-16 mr-2'></img>
      <h1 className="text-6xl font-bold mb-4 mt-2">TallAi.</h1>
      </div>
        <h1 className="text-4xl font-bold mb-4">Harness the Power of Ai for your Bussiness.</h1>
        <p className="text-lg mb-6">
The true potential of Ai is unlocked when it is used to solve real-world problems. TallAi is a platform that helps you leverage the power of Ai to solve your business problems and tap into your bussiness insights. Sign up today and start your Ai journey.
        </p>
        <div className="flex items-center">
          <img
           
          />
          <span className="text-xl font-light">Over 7k Happy Customers</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
