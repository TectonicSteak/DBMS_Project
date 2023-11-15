import { createContext,useState } from "react"
import Views from "./Views"

export const UserContext = createContext();

function App() {
  const [user,setUser] = useState({username: "" ,loggedIn:false});
  const [loginType, setLoginType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  

  return (
    <UserContext.Provider value={{user,setUser,loginType, setLoginType}}>
      <Views/>
    </UserContext.Provider>
  )
}

export default App