import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="border h-15 flex items-center p-5 space-x-6 mt-0.5 mb-20 bg-indigo-600">
      
        <Link 
          className='p-3 text-shadow-lg text-gray-300 bg-indigo-600 font-bold hover:text-white active:text-shadow-black' 
          to='/admin/perfil'> Editar Perfil
        </Link>

        <Link 
          className='p-3 text-shadow-lg text-gray-300 bg-indigo-600 font-bold hover:text-white active:text-shadow-black' 
          to='/admin/cambiar-password'> Cambiar Password
        </Link>

    </nav>    
    
  )
}

export default AdminNav