import AdminNav from "../components/adminNav"
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from "react"
import Alerta from "../components/Alerta"
import handleUpdateUser from "../helpers/handleUpdateUser"


const EditarPerfil = () => {
  const [alerta, setAlerta] = useState({})
  const { auth, setAuth, token } = useAuth()
  const [usuarioActualizado, setUsuarioActualizado] = useState(auth)

  useEffect(()=>{
      if (!alerta?.texto) return

    const timer = setTimeout(()=>{
      setAlerta({})
    },1500)

    return () => clearTimeout(timer)

  },[alerta])

  function updateUserData(e){
    e.preventDefault();

    setUsuarioActualizado(prev=>({
      ...prev,
      [e.target.id]:e.target.value
    }))

  }

  return (
    <>
        <AdminNav />

      <h2 className="text-black font-bold text-3xl flex justify-center">Perfil</h2>

            <p className="font-bold text-2xl text-center">
                Modifica los datos de tu{ ' ' } <span className="text-indigo-600">Perfil</span> 
            </p>

            <div className="flex justify-center mx-auto w-full">

                <form className="border border-black rounded-lg shadow-md shadow-black max-w-2/12 m-10
                    p-10 justify-center gap-5 inline-grid w-full" 
                    onSubmit={async e => {
                      e.preventDefault()                      
                      const response = await handleUpdateUser(usuarioActualizado, token)

                      if (!response.error) setAuth(response.data)

                      setAlerta({
                        error: response.error,
                        texto: response.texto
                      })

                    }}>

                    <div className="space-y-4 max-w-full w-full">

                      <div>
                        <label htmlFor="nombre" className="font-bold"> Nombre </label>                    
                        <input 
                          id='nombre'
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
                          type='text'
                          onChange={e=>{updateUserData(e)}}
                          value={usuarioActualizado.nombre}                            
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="font-bold"> Email </label>
                        <input 
                          id='email'
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
                          type='text'                          
                          onChange={e=>{updateUserData(e)}}
                          value={usuarioActualizado.email}                            
                        />
                      </div>

                        <div>
                        <label htmlFor="web" className="font-bold"> Web </label>
                        <input 
                          id='web'
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
                          type='text'                          
                          onChange={e=>{updateUserData(e)}}
                          value={usuarioActualizado.web}                            
                        />
                      </div>

                        <div>
                        <label htmlFor="telefono" className="font-bold"> Telefono </label>
                        <input 
                          id='telefono'
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
                          type='text'                          
                          onChange={e=>{updateUserData(e)}}
                          value={usuarioActualizado.telefono}                            
                        />
                      </div>
                      
                    </div>

                    <div>
                        <p className="text-sm text-red-500 font-semibold">
                            {''}
                        </p>
                    </div>

                    <div className="w-full mt-0">
                        <input
                            type='submit'
                            value='Guardar'
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

export default EditarPerfil