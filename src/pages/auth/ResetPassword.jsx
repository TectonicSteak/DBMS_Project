import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Changing Password",{position: "bottom-right"});

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setTimeout(() => {
        toast.dismiss(notification);
      }, 1000);
      toast.success("Password Changed", {
        autoClose: 1500,
        position: "bottom-right"
      });
      setTimeout(() => {
        navigate("/");
      }, 2500); 
    } catch (error) {
      setTimeout(() => {
        toast.dismiss(notification);
      }, 1500);
      toast.error("Invalid Password", {
        autoClose: 1500,
        position: "bottom-right"
      });
      console.error('Error resetting password:', error.message);
    }
  };
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-300">
      <h2 className="text-5xl font-semibold mb-5">Set New Password</h2>
      <form className="w-1/3"  onSubmit={handleSubmit}>
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
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
