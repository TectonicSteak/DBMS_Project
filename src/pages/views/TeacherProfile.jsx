import {React, useState, useEffect} from 'react';
import NavBarTeach from '../util/NavBarTeach';
import * as FnCalls from '../util/FunctionCalls'
import { ToastContainer } from 'react-toastify';

const TeacherProfile = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dept, setDept] = useState('');
    const [userData, setUserData] = useState('');
    const departments = [[1,'Computer Science and Engineering'],
                       [2,'Electrical and Electronics Engineering'],
                       [3,'Electronics and Communcation Engineering'],
                       [4,'Electronics and Biomedical Engineering']
                      ];


    const arr = name.split(' ')


    useEffect(() => {
        const fetchAndSetUser = async () => {
            try {
                const userId = await FnCalls.fetchUserId();
                if (userId) {
                    setUser(userId);
                    const user_data = await FnCalls.fetchTeacherData(userId);
                    setUserData(user_data);
                }
            } catch (error) {
                console.error("Error fetching User", error);
            }
        };

        fetchAndSetUser();
    }, [])

    useEffect(() => {
        if (userData) {
            setName(`${userData.f_name} ${userData.l_name}`);
            setPhone(userData.ph_no);
            setDept(userData.dept_ID);
        }
    }, [userData]);


    const handleSubmit = async (event) => {

        event.preventDefault();

        if(phone.length != 10){
            toast.error("Phone number must be 10 digits long", {
                autoClose: 1500,
                position: "bottom-right",
              });
            return;
        }

        const x = await FnCalls.updateTeacherProfile( userData.user_id , arr[0], arr.slice(1).join(" "), dept, phone)
            .then(() => {
                console.log('Profile Updated');
                toast.success('Profile Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
        })
            .catch((error) => console.error('Error updating Profile', error));

        console.log(x)
    }

    console.log(user, userData)
    return (
        <div className='bg-slate-300 h-screen'>
            <NavBarTeach />
            <div className="text-center mt-10">
                <h1 className="text-3xl font-semibold mb-6">Profile</h1>
                <div className="inline-block rounded-full overflow-hidden border-4 border-green-500 w-32 h-32 mb-6">
                    <img
                        src="path-to-profile-picture.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Department:
                        </label>
                        <select
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            className="border rounded-md p-2 w-full"
                            >
                            <option value="" disabled>Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept[0]} value={dept[0]}>{dept[1]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default TeacherProfile;
