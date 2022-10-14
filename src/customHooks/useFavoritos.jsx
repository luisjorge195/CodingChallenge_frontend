import { useContext } from 'react'
import FavoritosContext from '../context/FavoritosProvider'

const useFavoritos = () => {
  return useContext(FavoritosContext)
}

export default useFavoritos