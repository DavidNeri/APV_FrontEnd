import { Link } from 'react-router-dom'

const Login = () =>{
    return(
        <>
            <form className='bg-white shadow-2xl p-10 rounded-xl'>
                    <div className="my-5">
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Usuario</label>                
                        <input type="email" placeholder="Email de registro" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"/>
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Contraseña</label>                
                        <input type="password" placeholder="Contraseña" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"/>
                    </div>

                    <div className="flex justify-center">
                        <input 
                            type="submit" 
                            value="Iniciar Sesion" 
                            className="uppercase text-white text-center font-bold border bg-indigo-500 border-gray-300 rounded-xl w-full text-2xl p-3 mt-5 hover:cursor-pointer
                            hover:bg-indigo-800 active:bg-indigo-500"
                        />
                    </div>

                    <nav className='mt-5 lg:flex lg:justify-between'>
                        <Link className='text-gray-600 hover:underline' to='/olvide-password'> Recuperar contraseña </Link>
                        <Link className='text-gray-600 hover:underline'  to='/registrar'> Registrarse </Link>
                    </nav>
                
            </form>  
        
        </>
    )
}

export default Login