import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Server from "../constants/server";
import axios from 'axios';

const API_URL = Server.API_URL;

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const email=localStorage.getItem('registerEmail');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/check_otp`, { otp,email })
    .then(() => {
      navigate('/');
    })
    .catch(() => {
      setError('Registration failed');
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;