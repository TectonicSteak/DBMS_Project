import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Profile from "./Profile"

const Dashboard = () => {
    return (
        <>
            <div className="mainDash">
                <nav>
                    <h1>DashBoard</h1>
                    <Link className="links" to="/dashboard">Home</Link>
                    <Link className="links" to="/profile">Profile</Link>
                </nav>
            </div>
        </>
    )
}

export default Dashboard