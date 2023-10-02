import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"

const NavBar = () => {
    return(
        <>
            <nav>
                    <Link className="links" to="/dashboard">Home</Link>
                    <Link className="links" to="/profile">Profile</Link>
            </nav>
        </>
    )
}

export default NavBar;