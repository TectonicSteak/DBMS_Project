import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App