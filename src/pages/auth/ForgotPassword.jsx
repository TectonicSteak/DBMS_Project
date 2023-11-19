import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { Link, redirect } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email,{redirectTo: `https://student-management-dbms-app.netlify.app/reset_password`});

      if (error) {
        throw error;
      }

      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      console.error('Forgot Password Error:', error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h2 className="text-3xl mb-5">Forgot Password</h2>
      <form className="w-1/3" onSubmit={handleResetPassword}>
        <label className="text-lg mb-2">
          Email:
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded outline-none"
          />
        </label>
        <button
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded cursor-pointer"
        >
            Reset Password
        </button>
      </form>
      <p>{message}</p>
      <Link to={'/'} className="text-blue-500 mt-4 cursor-pointer">
        Back To Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
