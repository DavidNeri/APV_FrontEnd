import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import VeterinariosAPI from '../config/veterinariosAPI'
import Alerta from '../components/Alerta'
import recuperarContaseña from "../hooks/recuperarContraseña"

const CambiarContraseña= () =>{
    const {token} = useParams();
    const [alerta, setAlerta] = useState(null)
    const [contraseña, setContraseña] = useState()
    const [confirmaContraseña, setConfirmaContraseña] = useState()


   useEffect(()=>{
    (async ()=>{
        console.log("Funcion ascyncontra dentro del useEffec");
    })()

   },[])
    useEffect(()=>{ 
        const verificarToken = async () => {
            try {
                const response = await VeterinariosAPI.get(`/api/veterinarios/olvide-password/${token}`) 
                if (response.status!==200) {
                    setAlerta({
                        error: true,
                        texto: `Error ${response.status} - ${response.statusText}`
                    })
                }

            } catch (e) {
                setAlerta({
                        error: true,
                        texto: `Error ${e.response.status} - ${e.response.statusText}`
                })
            }

            setTimeout(() => {
                    setAlerta()                    
                }, 2000);

        };
        verificarToken()
    },[token])

    return (

        <>
            <main className="p-5 space-y-10 inline-block">
                <div>
                    <h1 className="text-indigo-500 text-6xl font-semibold ">Cambiar <span className="text-black ">Contraseña</span> </h1>


                    {
                        alerta && <Alerta {...alerta}/>                     
                    
                    }
                </div>

                <form className='bg-white shadow-2xl p-10 rounded-xl' onSubmit={async (e)=>{
                    e.preventDefault()
                    if (contraseña!==confirmaContraseña) {
                        setAlerta({
                            error:true,
                            texto:`Las contraseña no coinidicen`
                        })
                    }

                    if (contraseña.length < 6 ) {
                        setAlerta({
                            error:true,
                            texto:`${alerta?.texto ?? ''} la contraseña debe tener un minimo de 6 caracteres`
                        })
                    }

                    setTimeout(() => {
                        setAlerta()                    
                    }, 2000);

                    try {
                        const respuesta = await recuperarContaseña({contraseña, token})

                        if (respuesta.error) {
                            setAlerta({
                                error: respuesta.error,
                                texto: respuesta.texto
                            })

                            setTimeout(() => {
                                setAlerta()                    
                            }, 2000);
                        }else{
                            setAlerta({
                                error: respuesta.error,
                                texto: respuesta.texto
                            })

                            setTimeout(() => {
                                setAlerta()                    
                            }, 2000);
                        }
                        
                    } catch (e) {
                        setAlerta({
                            error: e.error,
                            texto: e.texto
                        })

                        setTimeout(() => {
                            setAlerta()                    
                        }, 2000);

                    }

                }}>
                    <div className="my-5 space-y-5">
                        
                        <input 
                            type="password"
                            placeholder="contraseña" 
                            className="border bg-gray-100 border-gray-300 rounded-md w-full p-3"
                            onChange={e=>setContraseña(e.target.value)}
                            
                        />

                        <input 
                            type="password" 
                            placeholder="Repetir contraseña" 
                            className="border bg-gray-100 border-gray-300 rounded-md w-full p-3"
                            onChange={e=>setConfirmaContraseña(e.target.value)}
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


            </main>
        </>
    )
}


export default  CambiarContraseña