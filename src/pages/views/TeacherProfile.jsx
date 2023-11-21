import React from 'react';
import NavBarTeach from '../util/NavBarTeach';

const TeacherProfile = () => {
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
                <form className="w-full max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Full Name:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Full Name"
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
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date of Birth:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
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
        </div>
    );
}

export default TeacherProfile;
