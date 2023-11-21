import { useEffect, useState } from 'react';
import { NavBarStu, TextInput } from "../util";
import supabase from "../../config/supabaseClient";
import * as FnCalls from '../util/FunctionCalls'


const StudentProfile = () => {


    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [userData, setUserData] = useState('')

    const arr = name.split(' ')


    useEffect(() => {
        const fetchAndSetUser = async () => {
            try {
                const userId = await FnCalls.fetchUserId();
                if (userId) {
                    setUser(userId);
                    const user_data = await FnCalls.fetchUserData(userId);
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
            setDob(userData.dob);
            setEmail(userData.email);
            setPhone(userData.ph_no);
        }
    }, [userData]);


    const handleSubmit = async (event) => {

        event.preventDefault();
        // fetchUser()
        const x = await FnCalls.updateStudentProfile(user, dob, arr[0], arr.slice(1).join(" "), phone, email)
            .then(() => console.log('Profile Updated'))
            .catch((error) => console.error('Error updating Profile', error));

        console.log(x)
    }

    console.log(user, userData)

    return (
        <div className='bg-slate-300 h-screen'>
            <NavBarStu />
            <div className="text-center mt-10">
                <h1 className="text-3xl font-semibold mb-6">Profile</h1>
                <div className="inline-block rounded-full overflow-hidden border-4 border-green-500 w-32 h-32 mb-6">
                    <img
                        src="path-to-profile-picture.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Full Name:
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
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date of Birth:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type='submit'
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentProfile;
