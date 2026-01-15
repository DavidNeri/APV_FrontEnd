import { Outlet, Navigate, Link} from "react-router-dom"
import useAuth from '../hooks/useAuth.jsx'
import FooterLayout from "./FooterLayout.jsx"


const AdmLayouth = () => {
    const {auth, cerrarSesion} = useAuth()


    return (        
        <>            
            <div className="bg-indigo-600 h-30 flex justify-between items-center">

                <h1 className="font-bold text-3xl text-shadow-lg text-gray-300 pl-10">
                    Administrador de Pacientes de <span className="font-extrabold text-white">Veterinaria</span>
                </h1>

                <div className="space-x-5 items-center pr-10">
                    <Link className="font-bold text-shadow-lg text-gray-300 pt-10 hover:underline" to={'/admin/pacientes'} >Pacientes</Link> 
                    <Link className="font-bold text-shadow-lg text-gray-300 pt-10 hover:underline" to={'/admin/perfil'} >Perfil</Link> 
                    <Link className="font-bold text-shadow-lg text-gray-300 pt-10 hover:underline" onClick={cerrarSesion} >Cerrar sesión</Link> 
                </div>

            </div>

            <main className="">                
                    { auth?._id ? <Outlet /> : <Navigate to='/' />}  
            </main>
            <FooterLayout />





        </>

    )
}


export default AdmLayouth