import { useState } from "react"
import FrmPacientes from '../components/FrmPacientes'
import ListadoPacientes from '../components/ListadoPacientes'

const AdmIndex = () => {
    const [mostrarFrm, setMostrarFrm] = useState(false)

    return (
        <>

            <div className="flex justify-between">

                <div className="p-5 w-5xl">
                    <h1 className="font-extrabold text-3xl flex justify-center p-5">Adminstrador de pacientes</h1>
                    <input
                        type='button'
                        value={` ${mostrarFrm ? 'Ocultar':'Mostrar'} Formulario`}
                        className={`
                            mx-auto flex
                            bg-indigo-600
                            w-8/12 
                            rounded-2xl p-2.5 
                            shadow-lg                            
                            text-2xl
                            font-bold
                            text-gray-200
                            m-5

                            hover:cursor-pointer
                            
                            active:bg-indigo-800
                            active:shadow-gray-700 

                            lg:pointer-events-none
                            lg:opacity-50
                            `}
                        aria-disabled='true'
                        onClick={()=>{
                            setMostrarFrm(!mostrarFrm)
                        }}
                        
                    />

                    <FrmPacientes 
                        mostrar={mostrarFrm}
                    />


                </div>
                    
                <div className="p-10 w-5xl">
                    <h1 className="font-extrabold text-3xl flex justify-center p-5">Listado de pacientes</h1>

                    <ListadoPacientes />
                </div>

            </div>
            
        </>        
    
    )
}

export default AdmIndex