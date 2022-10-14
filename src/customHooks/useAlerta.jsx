import { useContext } from 'react';
import AlertaContext from '../context/AlertaProvider.jsx';

const useAlerta = ()=>{
    return useContext(AlertaContext);
}
export default useAlerta;