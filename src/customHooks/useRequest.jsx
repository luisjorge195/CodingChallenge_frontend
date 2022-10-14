
import useAuth from '../customHooks/useAuth'
const useRequest = () => {
    const {token} = useAuth();
    
    const config = {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        } 
    }
    
  return {config}
}

export default useRequest
