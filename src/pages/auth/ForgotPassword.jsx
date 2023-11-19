import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { Link, redirect } from 'react-router-dom';
import { TextInput } from '../util';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email,{redirectTo: `https://student-management-dbms.vercel.app/reset_password`});
      

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
    <div className="h-screen flex flex-col items-center justify-center bg-slate-300">
      <h2 className="text-5xl font-semibold mb-5">Forgot Password</h2>
      <form className="w-1/3" onSubmit={handleResetPassword}>
        <TextInput label="Email" value={email} function={setEmail}/>
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
