import {useContext} from 'react'
import RegistroContext from '../context/RegistroProvider'

const useRegistro = ()=>{
    return useContext(RegistroContext)
}

export default useRegistro