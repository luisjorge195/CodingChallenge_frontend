import { createContext,useState, useEffect } from 'react';
import clienteAxios from '../helpers/clienteAxios';
import useAlerta from '../customHooks/useAlerta';
import useRequest from '../customHooks/useRequest';

const FavoritosContext = createContext();

const FavoritosProvider = ({children}) => {

    const [highScroll, sethighScroll] = useState(0);

    const {config} = useRequest();

    const handleScroll = () => {
        sethighScroll(window.scrollY)
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll )
    },["scroll"])

    const {setAlerta} = useAlerta()
    
    const favoritos = async(e, item, token)=>{
        e.preventDefault()
        
        const titulo_obra = item.title;
        const nombre_artista = item.principalOrFirstMaker;
        const url_image_obra = item.webImage.url

        const obrasFavoritos = { titulo_obra, nombre_artista, url_image_obra }
        try {
            const {data} = await clienteAxios.post('/obras', obrasFavoritos, config)
            setAlerta({
                error: false,
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
            console.log(error)
        }
       
    }
    
    return(
        <FavoritosContext.Provider
            value= {{
                favoritos, 
                highScroll
            }}
        >
            {children}
        </FavoritosContext.Provider>
    )
}
export { FavoritosProvider };
export default FavoritosContext
