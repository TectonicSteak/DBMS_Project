import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

const NavBarStu = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const navigate = useNavigate();
  
    const logOut = async () => {
      try {
        await supabase.auth.signOut();
  
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
  
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-around items-center">
          <div className="space-x-4 ">
            <Link
              to="/student_dashboard"
              className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/student_dashboard/report"
              className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Report
            </Link>
            <Link
              to="/student_dashboard/attendance"
              className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Attendance
            </Link>
          </div>
          <div className="ml-auto">
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              </button>
              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-300 w-full rounded-md text-left"
                    onClick={()=>{
                      navigate("/student_dashboard/student_profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={logOut}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-300 w-full rounded-md text-left"
                  >
                    Logout
                  </button>
                  {/* Add more dropdown items as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBarStu;
  