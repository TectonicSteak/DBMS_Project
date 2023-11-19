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
  const [hash, setHash] = useState(null);

  useEffect(() => {
    const hashValue = location.hash;
    setHash(hashValue);
  }, [location]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Changing Password");

    try {
      if (!hash) {
        return toast.error("Sorry, Invalid token", {
          id: notification,
        });
        
      } else if (hash) {
        const hashArr = hash
          .substring(1)
          .split("&")
          .map((param) => param.split("="));

        let type;
        let accessToken;
        for (const [key, value] of hashArr) {
          if (key === "type") {
            type = value;
          } else if (key === "access_token") {
            accessToken = value;
          }
        }

        if (
          type !== "recovery" ||
          !accessToken ||
          typeof accessToken === "object"
        ) {
          toast.error("Invalid access token or type", {
            id: notification,
          });
          return;
        }

        const { error } = await supabase.auth.updateUser(accessToken, {
          password: newPassword,
        });

        if (error) {
          toast.error(error.message, {
            id: notification,
          });
        } else if (!error) {
          toast.success("Password Changed", {
            id: notification,
          });
          
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorry Error occured", {
        id: notification,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h2 className="text-3xl mb-5">Set New Password</h2>
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
