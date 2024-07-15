import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../features/auth/authSlice';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const email=localStorage.getItem('registerEmail');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTP({ otp,email }))
      .unwrap()
      .then(() => {
        navigate('/login');
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