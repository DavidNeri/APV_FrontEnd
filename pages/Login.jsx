import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import VeterinariosAPI from '../config/veterinariosAPI'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth';

const Login = ()=>{
    const [email, setEmail] = useState('davidcneri@gmail.com');
    const [contraseña, setContraseña] = useState('123456');
    const [alerta, setAlerta] = useState()    
    const navigate = useNavigate()
    const { iniciarSesion } = useAuth()

    async function handleSubmit(e){
        e.preventDefault();

            VeterinariosAPI({
            method:'post',
            url:'/api/veterinarios/login',
            data:{
                email: email,
                password: contraseña
            }
        })
        .then(response=>{
            if (response.status==200) {
                iniciarSesion(response.data)
                navigate('/admin')
            }else{

                setAlerta({
                    error:true,
                    texto:`Error ${response.status} - ${response.data}`
                })
            }    

        })
        .catch(err=>{           
                
            if (err.response) {

                setAlerta({
                    error:true,
                    texto:`Error ${err.response.status} - ${err.response.data}`
                })

            }else{

                setAlerta({
                    error:true,
                    texto:`Error ${err.message}`
                })
                
            }            
        })

        setTimeout(() => {
            setAlerta()
        }, 2000);
    }
    
    return(
        <>
            <div>
                <h1 className="text-indigo-500 text-6xl font-semibold ">Inicia sesion y adminsitra tus <span className="text-black ">Pacientes</span> </h1>
            </div>

            <form className='bg-white shadow-2xl p-10 rounded-xl' onSubmit={handleSubmit}>
                {alerta && <Alerta {...alerta}/>}
                    <div className="my-5">
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Usuario</label>                
                        <input 
                            type="email"
                            placeholder="Email de registro"
                            className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Contraseña</label>                
                        <input
                        type="password"
                        placeholder="Contraseña"
                        className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        value={contraseña}
                        onChange={e=>setContraseña(e.target.value)}
                        />
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