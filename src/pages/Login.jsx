import { Link } from "react-router-dom";
import Alertas from "../components/Alertas.jsx";
import useAlerta from "../customHooks/useAlerta";
import useAuth from "../customHooks/useAuth";


const Login = () => {

    const { email, password, setEmail, setPassword, handleSubmit} = useAuth();
    const { alerta, setAlerta } = useAlerta();
    const { msg }= alerta;

   

    return (
        <div className="flex h-screen md:bg-[url('assets/galery.jpg')] md:bg-cover  ">
            <div className="m-auto md:bg-black opacity-80 brigthnes-60 md:p-10  rounded-xl  border-black md:border-0  sm:bg-white sm:p-5 p-4">
                
                <h1 className="text-4xl text-center md:text-white font-bold text-black">Bienvenido a ExpoArte</h1>
                <form className="mt-10" onSubmit={(e)=>handleSubmit(e, setAlerta)}>
                    <div className="">
                        <label className=" uppercase md:text-white block md:text-xl font-bold text-black">Correo</label>
                        <input 
                            className="w-full border-black border-2 md:border-0  mt-3 p-2 rounded-xl bg-white" 
                            type="email"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 mb-2">
                        <label className="uppercase md:text-white block md:text-xl text-black font-bold">Contraseña</label>
                        <input 
                            className="w-full border-black border-2 md:border-0 bg-white font-bold mt-3 p-2 rounded-xl " 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <Link className="md:text-white font-bold mt-6 text-black" to="/logout">¿No tienes una cuenta?. Registráte</Link>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión" 
                        className="w-full rounded-xl bg-red-900 text-2xl text-white font-bold mt-3 p-1 cursor-pointer"
                    />
                    {msg && <Alertas alerta={alerta}/>}
                
                </form>
            </div>
         
        </div>
    )
}

export default Login
