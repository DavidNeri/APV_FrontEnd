import { useState } from 'react'
import campos from '../helpers/camposFrmPacientes.js'
import handleSubmit from '../helpers/handleSubmit'
import handleUpdate from '../helpers/handleUpdate'
import useAuth from '../hooks/useAuth.jsx'
import usePacientes from '../hooks/usePacientes.jsx'
import Alerta from '../components/Alerta.jsx'

const FrmPacientes = ({mostrar}) => {
    
    const {auth, token} = useAuth()
    const {form, setForm, setLstpacientes, frmAction, setFrmAction, idPaciente, setIdPaciente } = usePacientes()
    const [alerta, setAlerta] = useState()

    const handleChange = (e) => {
        const {name, value} = e.target

        setForm(prev=>({
            ...prev,
            [name]: value
        }))
        
    }
    
    const mostrarCampos = ()=>{         
        return campos.map(campo=>{
            return (
                <div key={campo.id} className='p-2.5 grid'>
                    <label className='font-bold text-gray-800 p-2.5' htmlFor={campo.id}>{campo.name}</label>
                    <input
                        type={campo.type}
                        placeholder={campo.placeHolder}
                        id={campo.id}
                        name={campo.id}
                        className='rounded-md p-2 w-full mt-1 border-2 border-gray-400'
                        value={form[campo.id] || ''}
                        onChange={handleChange}
                    />
                </div>
            )
        })
    }
    

    return (
        <>
            <div>
                {alerta && <Alerta 
                    {...alerta}
                />}
            </div>
            <form 
                className={`bg-white rounded-2xl shadow-sm border-gray-200 p-5 ${mostrar ? 'block' : 'hidden'} lg:block`}

                    onSubmit={async e=>{
                        e.preventDefault();                    
                        if (!idPaciente) {

                            const respuesta = await handleSubmit(form, auth._id, token)
                            const pac = respuesta.paciente                        
                            if (respuesta.paciente) {
                                setLstpacientes(prev=>(
                                    [ ...prev, 
                                        pac
                                    ]
                                ))
                            } 

                            setAlerta({
                                error: respuesta.error,
                                texto: respuesta.texto
                            })

                        }else{
                            const {error, texto, paciente} = await handleUpdate(form, idPaciente, auth._id, token)

                            setAlerta({
                                error: error,
                                texto: texto
                            })
                            
                            if (paciente) {                            
                                const pActualizado = paciente
                                setLstpacientes(prev=>(
                                    prev.map(p=> p._id ==pActualizado._id ? {...pActualizado} : p )
                                ))
                            }

                            setIdPaciente()
                            setFrmAction('Guardar') 
                        } 
                        
                        setForm({})

                        setTimeout(() => {
                            setAlerta()
                        }, 2000);

                    }}
                >

                {mostrarCampos()}  

                <div className='p-2.5'>
                    <label htmlFor='sintomas' className='font-bold text-gray-800 p-2.5'>Sintomas</label>
                </div>

                <textarea
                    id='sintomas'
                    name='sintomas'
                    placeholder='Descripcion de los sintomas'
                    className='w-full border-2 border-gray-400 rounded-sm p-2.5'
                    value={form.sintomas || ''}
                    onChange={handleChange}

                />

                <input
                    type='submit'
                    value={frmAction}
                    className="mx-auto block bg-indigo-600 w-4/12 rounded-2xl p-2.5 shadow-lg
                    active:bg-indigo-800 active:shadow-gray-700 hover:cursor-pointer
                    text-2xl font-bold text-gray-200 m-5 mt-5"                
                />            
            
            </form>
        </>
    )
}

export default FrmPacientes