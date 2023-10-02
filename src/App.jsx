import { createContext,useState } from "react"
import Views from "./Views"

export const UserContext = createContext();

function App() {
  const [user,setUser] = useState({username: "" ,loggedIn:false});
  return (
    <UserContext.Provider value={{user,setUser}}>
      <Views/>
    </UserContext.Provider>
  )
}

export default App