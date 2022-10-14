import {useEffect, useState} from 'react'
import useAuth from '../customHooks/useAuth.jsx';
import clienteAxios from '../helpers/clienteAxios.js';
import useRequest from '../customHooks/useRequest'

const useListaFavoritos = () => {

    const [listaFavoritos, setListaFavoritos] = useState([]);
    const { token } = useAuth();
    const {config } = useRequest();
    const eliminarFavorito = async(e,_id, token, setAlerta)=>{

        e.preventDefault()
        try {
           const {data} =  await clienteAxios.delete(`/favoritos/${_id}`, config);
           setAlerta({
            error:false,
            msg: data.msg
           })

        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        let isApiSubscribed = true;
        const listaFavoritos = async()=>{
            if(isApiSubscribed){
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    } 
                }
                const {data} = await clienteAxios('/favoritos', config);
                setListaFavoritos(data)
            }
            
        }
        listaFavoritos();
        return () =>{
            isApiSubscribed = false;
        }
    },[listaFavoritos])
  return {listaFavoritos, eliminarFavorito}
}

export default useListaFavoritos