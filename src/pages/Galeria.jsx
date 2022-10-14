import { Outlet, Navigate } from 'react-router-dom'
import useAuth from "../customHooks/useAuth.jsx"
const Galeria = () => {
 const {token} = useAuth()
    
  return (
    <div>
        {token ? <Outlet /> : <Navigate to="/" />}
    </div>
  )
}

export default Galeria
