import { useEffect, useState } from 'react';
import { NavBarStu } from "../util";
import supabase from "../../config/supabaseClient";
import * as FnCalls from '../util/FunctionCalls'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


const StudentProfile = () => {


    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [phone, setPhone] = useState('');
    const [userData, setUserData] = useState('');
    const [gender, setGender] = useState('');

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
            setAddress(userData.address);
            setCgpa(userData.CGPA);
            setGender(userData.gender);
        }
    }, [userData]);


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (phone.length != 10) {
            toast.error("Phone number must be 10 digits long", {
                autoClose: 1500,
                position: "bottom-right",
            });
            return;
        }

        const isValidEmail = (email) => {
            const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            return regex.test(email);
        };

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid Gmail address", {
                autoClose: 1500,
                position: "bottom-right"
            });
            return;
        }


        const x = await FnCalls.updateStudentProfile(user, dob, arr[0], arr.slice(1).join(" "), phone, email, address, cgpa, gender)
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

    }

    console.log(user, userData)


    return (
        <div className='bg-slate-300'>
            <NavBarStu />
            <div className="text-center mt-6">
                <h1 className="text-3xl font-semibold mb-6">Profile</h1>
                {/* <div className="inline-block rounded-full overflow-hidden border-4 border-green-500 w-32 h-32 mb-6">
                    <img
                        src="path-to-profile-picture.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div> */}
                <form className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <TextInput label="Full Name" value={name} onChange={setName} />
                    <TextInput label="Email" type="email" value={email} onChange={setEmail} />
                    <TextInput label="Phone" type="tel" value={phone} onChange={setPhone} />
                    <TextInput label="Date of Birth" type="date" value={dob} onChange={setDob} />
                    <TextInput label="Gender" value={gender} onChange={setGender} />
                    <TextInput label="Address" value={address} onChange={setAddress} />
                    <TextInput label="CGPA" type="number" value={cgpa} onChange={setCgpa} />
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        type='submit'
                    >
                        Update Profile
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

const TextInput = ({ label, value, onChange, type = "text" }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default StudentProfile;
