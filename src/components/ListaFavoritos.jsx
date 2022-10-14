
import useAlerta from '../customHooks/useAlerta.jsx';
import useAuth from '../customHooks/useAuth.jsx';
import useListaFavoritos from '../customHooks/useListaFavoritos.jsx';

const ListaFavoritos = ({item}) => {

    const {token} = useAuth();
    const {setAlerta} = useAlerta();
    const {eliminarFavorito} = useListaFavoritos();
    
    return (
        <div>
            <img
                className="w-full md:h-56 md:mt-4 md:p-10 "
                key={item.id_obra}
                src={item.url_image_obra}
                alt={item.titulo_obra}          
            />
                                
            <h1 className="text-2xl text-center">{item.titulo_obra}</h1>
            <h1 className="mt-2 text-center">{item.nombre_artista}</h1>
            <input
                className="w-full bg-red-500 p-2 mt-2 rounded-md text-white hover:bg-red-700 cursor-pointer"
                type="submit"
                onClick={(e) => eliminarFavorito(e, item.id_obra, token, setAlerta)}
                value="Quitar de mi lista"
            />
        </div>
    )
}


export default ListaFavoritos
