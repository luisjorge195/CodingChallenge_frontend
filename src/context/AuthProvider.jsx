import { createContext , useState } from 'react'
import { useNavigate} from 'react-router-dom'
import clienteAxios from '../helpers/clienteAxios.js'

const AuthContext = createContext();


const AuthProvider = ({children})=>{

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] =  useState('');
    const [ nombre, setNombre ] =  useState('');
    const [ token, setToken] = useState('');

    const navigate = useNavigate()

    ///Funcion de logueo usuario
    const handleSubmit = async(e, setAlerta)=>{
        e.preventDefault();
        const temporizador = ()=>{
            setTimeout(()=>{
                setAlerta('')
            },4000)
        }
        
        if ([email, password].includes('')) return ((setAlerta({ error: true, msg: 'Todos los campos son obligatorios' })), temporizador());
           
       
        
        try {
            const { data } = await clienteAxios.post('/login', {email,password});
            setNombre(data.nombre)
            setToken(data.token);
            navigate('/galeria');
            
        } catch (error) {
            setAlerta({
                error:true,
                msg:error.response.data.msg
            })
            temporizador()
        }
      
        
    }


   
    return(
        <AuthContext.Provider
            value={{
                email,
                password,
                setEmail,
                setPassword,
                handleSubmit,
                token,
                nombre,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider}
export default AuthContext;