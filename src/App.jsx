import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Logout from './pages/Logout'
import {AuthProvider} from './context/AuthProvider.jsx'
import { RegistroProvider } from './context/RegistroProvider.jsx';
import { AlertaProvider } from './context/AlertaProvider.jsx'
import Galeria from './pages/Galeria.jsx'
import PerfilUsuario from "./pages/PerfilUsuario.jsx";
import ListaObras from './components/ListaObras.jsx';
import { FavoritosProvider } from './context/FavoritosProvider';
import Perfil from './components/Perfil';

function App() {
  
  return (
    
    <BrowserRouter>
      <RegistroProvider>
        <AuthProvider>
          <AlertaProvider>
            <FavoritosProvider>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/galeria' element={<Galeria/>}>
                  <Route index element={<ListaObras/>}/>
                </Route>
                <Route path='/perfil' element={<PerfilUsuario/>}>
                  <Route index element={<Perfil/>}/>
                </Route>
              </Routes>
            </FavoritosProvider>
          </AlertaProvider>
        </AuthProvider>
      </RegistroProvider>
    </BrowserRouter>
  )
}

export default App
