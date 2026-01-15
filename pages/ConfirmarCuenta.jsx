import Login from   '../components/Login'
import Alerta from '../components/Alerta'

import VeterinariosAPI  from '../config/veterinariosAPI'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'



const ConfirmarCuenta = () => {  

    const {id} = useParams();
    const [alerta, setAlerta] = useState({})

    useEffect(()=>{

        try {   
            VeterinariosAPI({
                method:'POST',
                url:`/api/veterinarios/confirmar/${id}`,
            })
            .then((response)=>{

                if (response.status==200) {
                    setAlerta({
                        error:false,
                        texto: response.data
                    });          
                }else{
                    setAlerta({
                        error:true,
                        texto: response.data
                    })
                
                }
            })
            .catch((error)=>{
                setAlerta({
                    error:true,
                    texto: error.response.data ?? 'Error Desconocido, intente nuevamente mas tarde'
                })            
            })
                    
        } catch (error) {
            setAlerta({
                error:true,
                texto: error.message ?? 'Error Desconocido, intente nuevamente mas tarde'
            });
        
        }

        setTimeout(() => {
            setAlerta({})                
        }, 3000);
        
    },[id])

    return (
        <>
        

            <div>
                <h1 className="text-indigo-500 text-6xl font-semibold ">Inicia sesion y adminsitra tus <span className="text-black ">Pacientes</span> </h1>
            </div>
            <div>
                <Login />
            </div>
            

            <footer className='w-full mt-5 flex'>
                    {alerta.texto && <Alerta 
                {...alerta}
            
                />}
            </footer>
            





                
        </>
    
    )}

export default ConfirmarCuenta