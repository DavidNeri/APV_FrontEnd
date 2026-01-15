import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Authlayouth from '../layouts/AuthLayout.jsx'
import Login from '../pages/Login.jsx'
import ConfirmarCuenta from '../pages/ConfirmarCuenta.jsx'
import OlvidePasword from '../pages/OlvidePasword.jsx'
import Registrar from '../pages/Registrar.jsx'
import CambiarContraseña from '../pages/CambiarContraseña.jsx'
import { AuthProvider } from '../context/AuthProvider.jsx'
import AdmLayouth from '../layouts/AdmLayouth.jsx'
import AdmIndex from '../pages/AdmIndex.jsx'
import { PacientesProvider } from '../context/PacientesProvider.jsx'
import EditarPerfil from '../pages/EditarPerfil.jsx'
import CambiarPassword from '../pages/CambiarPassword.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            <Route path='/' element={<Authlayouth/>}>
              <Route index element={<Login />}/>          
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              <Route path='olvide-password' element={<OlvidePasword />}/>
              <Route path='olvide-password/:token' element={<CambiarContraseña />}/>
              <Route path='registrar' element={<Registrar />}/>          
            </Route>

            <Route path='/admin' element={<AdmLayouth />}>
              <Route index element={<AdmIndex />} /> 
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-Password' element={<CambiarPassword />} />
              <Route path='pacientes' element={<AdmIndex /> } />              
            
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>      
    </BrowserRouter>

    
    
  )
} 

export default App
