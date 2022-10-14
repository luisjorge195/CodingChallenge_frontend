import {Outlet, Navigate} from 'react-router-dom';
import useAuth from "../customHooks/useAuth";

const PerfilUsuario = () => {
    const{token} = useAuth();
    return (
        <div>{token ? <Outlet /> : <Navigate to="/" />}</div>
        
    )
}

export default PerfilUsuario