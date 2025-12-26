import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.jpg'; // Ensure this path is correct

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT TRIGGERED");
  
    try {
      const response = await fetch('https://backend-copy-1.onrender.com/api/login', { // Replace with your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      console.log(result);
      console.log(password === 'mmn@141318', password);

  
      if (response.ok) {
        // Check if the email is 'adventemp1@gmail.com'
        if (email === 'adventemp1@gmail.com') {
          navigate('/homeEmp1'); // Navigate to /homeEmp1
        } else if (email === 'adventemp2@gmail.com') {
          navigate('/homeEmp2'); // Navigate to /homeEmp1
        }else if (email === 'adventemp3@gmail.com') {
          navigate('/homeEmp3'); // Navigate to /homeEmp1
        }else if (email === 'adventemp4@gmail.com') {
          navigate('/homeEmp4'); // Navigate to /homeEmp1
        }else if (email === 'adventemp5@gmail.com') {
          navigate('/homeEmp5'); // Navigate to /homeEmp1
        }else if (password === 'MMN@141318taiadvJRK@181104') {
          navigate('/home2'); // Navigate to /home2
        } else {
          navigate('/home1'); // Navigate to /home1
        }
      } else {
        // Show error message from the server response
        setErrorMessage(result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
        src={logo}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-sm text-red-600">
              {errorMessage}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
  Not a member?{' '}
  <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
    Register
  </a>
</p>

      </div>
    </div>
  );
}
