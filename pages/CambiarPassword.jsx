import AdminNav from "../components/AdminNav"
import { useState, useEffect } from "react"
import handleChangePassword from '../helpers/handleChangePassword'
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const CambiarPassword = () => {
    const [actual,setActual] = useState('')
    const [nueva, setNueva] = useState('')
    const [nueva_r, setNueva_r] = useState('')
    const [validacion, setValidacion] = useState('')
    const [alerta, setAlerta] = useState({})

    const { auth:{ email } = {} } = useAuth()
    
    useEffect(()=>{
        if (!validacion) return
        const timer = setTimeout(()=>{
            setValidacion('')
        },2000)
        return () => clearTimeout(timer)
    },[validacion]) 

    useEffect(()=>{
        if (!alerta?.texto) return
        const timer = setTimeout(()=>{
            setAlerta({})
        },2000)
        return () => clearTimeout(timer)
    },[alerta])

    return(
        <>
            <AdminNav />

            <h2 className="text-black font-bold text-3xl flex justify-center">Cambiar Password</h2>

            <p className="font-bold text-2xl text-center">
                Modifica tu{ ' ' } <span className="text-indigo-600">Password Aqui</span> 
            </p>

            <div className="flex justify-center mx-auto w-full">

                <form className="border border-black rounded-lg shadow-md shadow-black max-w-2/12 m-10
                    p-10 justify-center gap-5 inline-grid w-full" 
                    onSubmit={async e=>{
                        e.preventDefault();
                        if (nueva=='' || nueva_r=='' || actual=='') {
                            setValidacion('Faltan datos')
                            return
                        }
                                                        

                        if (actual===nueva || actual===nueva_r) {
                            setValidacion('La nueva contraseña no puede ser igual a la anterior')                            
                            return
                        }
                            

                        if (nueva!==nueva_r) {
                            setValidacion('Las contraseñas no coinciden')                            
                            return
                        }                            

                        const respuesta = await handleChangePassword(actual, nueva, email)

                        if(respuesta){
                            setAlerta(respuesta)

                            if (!respuesta.error) {
                                setActual('')
                                setNueva('')
                                setNueva_r('')
                            }

                        }



                    }}>

                    <div className="space-y-4 max-w-full w-full">

                    
                        <input 
                            id='actual'
                            className="border
                                border-gray-400
                                rounded-sm
                                pl-2.5
                                placeholder:text-gray-5100 
                                placeholder:font-light 
                                placeholder:text-sm 
                                placeholder:italic
                                w-full                                
                                "
                            type='password'
                            placeholder="Contraseña Actual"
                            onChange={e=>setActual(e.target.value)}
                            value={actual}
                            
                        />

                        <input 
                            id='nueva'
                            className="border
                                border-gray-400
                                rounded-sm
                                pl-2.5
                                placeholder:text-gray-5100 
                                placeholder:font-light 
                                placeholder:text-sm 
                                placeholder:italic
                                w-full"
                            type="password"
                            placeholder="Nueva contraseña"
                            onChange={e=>setNueva(e.target.value)}
                            value={nueva}
                            
                        />

                        <input 
                            id='nueva_r'
                            className="border
                                border-gray-400
                                rounded-sm
                                pl-2.5
                                placeholder:text-gray-5100 
                                placeholder:font-light 
                                placeholder:text-sm 
                                placeholder:italic
                                w-full
                                "
                            type="password"
                            placeholder="Repetir nueva contraseña"
                            onChange={e=>setNueva_r(e.target.value)}
                            value={nueva_r}
                            
                        />
                    </div>

                    <div>
                        <p className="text-sm text-red-500 font-semibold">
                            {validacion}
                        </p>
                    </div>

                    <div className="w-full mt-0">
                        <input
                            type='submit'
                            value='Cambiar contraseña'
                            className='
                                p-2 w-full 
                                sm:text-sm 
                                md:text-md 
                                lg:text-lg 
                                break-after-right
                                border-gray-200 shadow-sm shadow-black rounded bg-indigo-500
                                font-bold text-gray-100  text-shadow-md                                   
                                hover:cursor-pointer
                                hover:text-shadow-black
                                hover:bg-amber-500 transition-colors duration-70
                                active:bg-indigo-800
                                h-full'
                        />

                    </div>

                </form>

            </div>     

            <div className="w-full">
                {alerta.texto && <Alerta 
                    {...alerta}
                />}
            </div>       
            
        </>
    )
}

export default CambiarPassword