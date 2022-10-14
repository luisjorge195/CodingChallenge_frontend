import { createContext, useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
const RegistroContext = createContext();

const RegistroProvider = ({children})=>{
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] =  useState('');
    const [ nombre, setNombre ] =  useState('');

    const handleRegistro = async(e, setAlerta) =>{
        e.preventDefault()
        if([nombre, email, password].includes('')){
            setAlerta({
                error: true,
                msg:'todos los campos son obligatorios'
            })
            return
        }
        try {
            await clienteAxios.post('/registro', {nombre, email, password})
            setAlerta({
                error: false,
                msg:'Se registró correctamente'
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <RegistroContext.Provider
            value={{
                handleRegistro,
                setEmail,
                setPassword,
                setNombre
            }}
        >
            {children}
        </RegistroContext.Provider>
    )
}
export {RegistroProvider}
export default RegistroContext