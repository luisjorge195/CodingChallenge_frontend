import { createContext, useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
const RegistroContext = createContext();

const RegistroProvider = ({children})=>{
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] =  useState('');
    const [ nombre, setNombre ] =  useState('');

    const handleRegistro = async(e, setAlerta) =>{
        const temporizador = () =>{
            setTimeout(()=>{
                setAlerta('')
            },4000)
        }
        e.preventDefault()
        if([nombre, email, password].includes('')) return ((setAlerta({error:true, msg:'todos los campos son obligatorios'})), temporizador())
        if (password.length < 6) return ((setAlerta({ error: true, msg: 'La contraseña debe tener al menos 6 caracteres' })), temporizador());
        
        try {
            const{data} =await clienteAxios.post('/registro', {nombre, email, password})
            setAlerta({
                error: false,
                msg:data.msg
            })
            setNombre(' ');
            setEmail(' ');
            setPassword(' ');

        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
            temporizador()
        }
    }
    return (
        <RegistroContext.Provider
            value={{
                handleRegistro,
                setEmail,
                setPassword,
                setNombre,
                email,
                nombre,
                password
            }}
        >
            {children}
        </RegistroContext.Provider>
    )
}
export {RegistroProvider}
export default RegistroContext