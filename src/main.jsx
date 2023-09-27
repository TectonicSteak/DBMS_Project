import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './pages/util/Dashboard.jsx'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import "./main.css"

//DBMS PASSWORD : dbms_project_123

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
