import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import useAlerta from "../customHooks/useAlerta.jsx"
import useAuth from "../customHooks/useAuth"
import useFavoritos from "../customHooks/useFavoritos"
import useListaObras from '../customHooks/useListaObras'
import Alertas from "./Alertas.jsx"

const Header = () => {

    const [activo, setActivo] = useState(false);
    const [autor, setAutor] = useState('');
    

    const {alerta, setAlerta}= useAlerta();

    const {resultados, setObra, obra, loader} = useListaObras();

    const {nombre, token} = useAuth()
    const {favoritos, highScroll} = useFavoritos();

    const navigate = useNavigate();

    const perfil = (e)=>{
        e.preventDefault();
        setActivo(!activo)
        navigate('/perfil')
    }
    
    const cerrarSesion = ()=>{
        navigate('/')
    }

    setTimeout(()=>{
        setAlerta('')
    },9000)

    const coleccionObras = (Object.values(resultados).filter((item)=>((((item.title).toLowerCase()).startsWith(obra.toLocaleLowerCase())) && (item.hasImage))))
    const coleccionTitulos = (Object.values(resultados).filter((item)=>((((item.principalOrFirstMaker).toLowerCase()).startsWith(autor.toLowerCase())) && (item.hasImage))))
        
    const {msg} = alerta;
    
    return (
        <div >
            <div className="bg-slate-900 md:w-full md:h-24 md:flex md:justify-between md:items-center ">
                <div>
                    <h1 className="text-white font-bold text-2xl ml-10 block">BIENVENIDO A MUSEO RIJKSMUSEUM</h1>
                    <h3 className="text-white ml-10 font-bold">Ámsterdam,Países bajos</h3>
                </div>
                <div className="flex justify-evenly mt-4 mr-14">
                    <FontAwesomeIcon onClick={cerrarSesion} className="text-white text-3xl cursor-pointer mr-14" icon={faArrowRightFromBracket} />
                    <div>
                    <div className="overflow-hidden block relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute -left-block 1 w-12 h-12 text-gray-400 cursor-pointer" onClick={perfil} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                        <h1 className="text-white">{nombre}</h1>
                    </div>
                </div>
            </div>
        
            <form className="bg-slate-300 w-full h-20 flex justify-center items-center">
                <div className="relative w-2/3 ">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                        type="search" 
                        className=" focus:outline-none block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="Buscar por título de la obra" 
                        required
                        value={obra}
                        onChange={e =>setObra(e.target.value)}
                    />
                </div>
            </form>
            <form className="bg-slate-300 w-full h-20 flex justify-center items-center">
                <div className="relative w-2/3 ">
                    <input className="form-control inp" onChange={e=>setAutor(e.target.value)} list="datalistOptions" id="exampleDataList" placeholder="Buscar por autor"/>
                    <datalist id="datalistOptions" >
                        {
                            (
                                coleccionObras.map((item, index)=>(
                                    <option key={index} >{item.principalOrFirstMaker}</option>
                                ))
                            )
                        }
                       
                    </datalist>
                </div>
            </form>
            <div className={highScroll>=300 && "fixed top-0 left-0 right-0 z-1 "}>
                <h1 className="text-3xl text-slate-800 bg-white p-4 text-center">Explora nuestra colección de Arte</h1>
                <div className="flex justify-center">
                    <div className={alerta.error ? "bg-red-800 text-center  md:w-1/2 sm:w-70" : " md:w-1/2 sm:w-70 bg-blue-800 text-center"}>
                        { msg && <Alertas  alerta={alerta}/>} 
                    </div>
                </div>
            </div>
            {loader ? (<div className="spinner"></div>) : (
            <div className="grid lg:grid-cols-4 ml-14 my-14 gap-10 mr-14 md:grid-cols-3 xs:grid-cols-2 ">
                {
                    ((autor.includes(' ')) ? coleccionObras : coleccionTitulos).map((item,index) => (
                        (!item.hasImage) ?( <h1>No hay resultados</h1>) : (
                            
                            <div className="" key={index}>
                                <img
                                    className="md:w-full md:h-56 md:mt-4 xs:p-10 "
                                    key={index}
                                    src={item?.webImage.url}
                                    alt={item?.principalOrFirstMaker}
                                    
                                />
                                    
                                <h1 className="text-2xl text-center">{item?.title}</h1>
                                <h1 className="mt-2 text-center">{item?.principalOrFirstMaker}</h1>
                                <nav className="text-center text-red-700">
                                    <a className=" hover:border-b-2 border-b-red-900" target="_blank" href={item?.links?.web}>Ver obra</a>
                                </nav>
                                
                                <input
                                    type="submit"
                                    onClick={(e)=>favoritos(e,item,token)}
                                    value="Agregar a favoritos"
                                    className="w-full text-white cursor-pointer p-2 bg-slate-800 hover:bg-slate-900 mt-2 rounded-lg focus:outline-none"
                                />
                            </div>
                            )
                        )
                    )
                   
                }
            </div>
            )}
        </div>
    )
}

export default Header