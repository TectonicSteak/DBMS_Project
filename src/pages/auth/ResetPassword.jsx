import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [hash,setHash] = useState(null);


  useEffect(()=>{
    setHash(window.location.hash);
  },[]);

  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Changing Password");

    try {
      const { error } = await supabase.auth.updateUser(token, {
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setMessage('Password updated successfully.');
      navigate('/');
    } catch (error) {
      setMessage('Error updating password. Please try again.');
      console.error('New Password Error:', error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h2 className="text-3xl mb-5">Set New Password</h2>
      <form className="w-1/3"  onSubmit={handleSetNewPassword}>
        <label className="text-lg mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded outline-none"
          />
        </label>
        <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded cursor-pointer"
        >
          Set Password
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
