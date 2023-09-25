import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

