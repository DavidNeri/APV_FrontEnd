import { Link } from "react-router-dom"
import { useState } from "react"
//import  recuperarContraseña  from '../hooks/recuperarContraseña'
import VeterinariosAPI from '../config/veterinariosAPI'
import Alerta from '../components/Alerta'


const OlvidePasword = () => {
    const [email, setEmail] = useState()
    const [alerta, setAlerta] = useState(null)


    async function enviarMail_recuperarContraseña(e){

        e.preventDefault();
        //nst response = await recuperarContraseña(email);

        try {
            console.log(email);
            const response = await VeterinariosAPI.post('/api/veterinarios/olvide-password',{email})
            console.log(response);

            if (response.status==200) {            
                setAlerta({
                    error: false,
                    texto: response.data
                })

                setEmail()
            }else{
                setAlerta({
                    error: true,
                    texto: response.data
                })
            }

            
            
        }catch (error) {
            console.log(error);
            
        }

        

        
        
    }

    setTimeout(() => {
        setAlerta(null)        
    }, 2000);

    return(
    <>
        <div>
            <h1 className="text-indigo-500 text-6xl font-semibold ">Recuperar <span className="text-black ">Contraseña</span> </h1>
        </div>

            <form className='bg-white shadow-2xl p-10 rounded-xl' onSubmit={enviarMail_recuperarContraseña}>

                {   alerta && <Alerta {...alerta}/> }
                
                    <div className="my-5">
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >E-mail</label>                
                        <input 
                            type="email" 
                            placeholder="Email de registro" 
                            className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                            onChange={e=>setEmail(e.target.value)}
                            value={email}
                            
                        />
                    </div>
                    
                    <div className="flex justify-center">
                        <input 
                            type="submit" 
                            value="Recuperar Contraseña" 
                            className="uppercase text-white text-center font-bold border bg-indigo-500 border-gray-300 rounded-xl w-full text-2xl p-3 mt-5 hover:cursor-pointer
                            hover:bg-indigo-800 active:bg-indigo-500"
                            
                        />
                    </div>


                    <nav className='mt-5 lg:flex lg:justify-between'>
                        <Link className='text-gray-600 hover:underline' to='/'>Iniciar Sesion</Link>
                        <Link className='text-gray-600 hover:underline'  to='/registrar'> Registrarse </Link>
                    </nav>
                
            </form>

    </>
    )
}

export default OlvidePasword