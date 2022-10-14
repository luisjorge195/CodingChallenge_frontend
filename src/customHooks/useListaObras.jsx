import {useEffect, useState} from 'react';
import clienteAxios from '../helpers/clienteAxios';
import useAuth from '../customHooks/useAuth';

const useListaObras = () => {
    const [resultados, setResultados] = useState([]);
    const [obra, setObra] = useState('');
    const [autor, setAutor] = useState('');
    const [loader, setLoader] = useState(false);

    const {token} = useAuth();
   
    
    useEffect(()=>{
        setLoader(true)
        const url = `${import.meta.env.VITE_URL_API}/api/en/collection?key=${import.meta.env.VITE_URL_API_KEY}&ps=35&involvedMaker&title&q=${obra}`
        let isApiSubscribed = true;
        const obtenerTitulos = async()=>{ 
            
            if (isApiSubscribed) {
                const {data} = await clienteAxios(url, { headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` }});
                setResultados(data.artObjects);
            }
            setLoader(false)
        }
      
        obtenerTitulos();

        return () => {
            isApiSubscribed=false
        }
    },[obra])

    useEffect(()=>{
        setLoader(true)
        const url = `${import.meta.env.VITE_URL_API}/api/en/collection?key=${import.meta.env.VITE_URL_API_KEY}&ps=35&involvedMaker&title&q=${autor}`
        let isApiSubscribed = true;
        const obtenerAutores = async()=>{ 
            if (isApiSubscribed) {
                const {data} = await clienteAxios(url, { headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` }});
                setResultados(data.artObjects);
            }
            setLoader(false)
        }
      
        obtenerAutores();

        return () => {
            isApiSubscribed=false
        }
    },[autor])
    return {resultados, setObra, obra, setAutor, autor, loader}
}

export default useListaObras
