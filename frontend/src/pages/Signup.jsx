import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',   // ✅ matches backend field name
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  // ✅ Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      // ✅ Send request to backend
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,  // ✅ backend expects userName
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(`${serverURL}/api/auth/signup`, payload, {
        withCredentials: true,
      });

      console.log("Signup success:", res.data);
      alert("Signup successful! Please log in.");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed. Try again.";
      setError(errorMessage);
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[400px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px] rounded-lg"
      >
        <h1 className="text-gray-800 text-[30px] font-semibold mb-[10px] text-center">
          Sign Up
        </h1>

        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"
        />

        {/* Username */}
        <input
          type="text"
          name="userName"   // ✅ matches backend
          placeholder="Username"
          value={formData.userName}
          onChange={handleInputChange}
          required
          className="w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"
        />

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold cursor-pointer"
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded-full mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-700 text-md mt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
