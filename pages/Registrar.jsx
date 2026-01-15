import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Alerta from '../components/Alerta.jsx'

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const[confirmar_contraseña, setConfirmar_contraseña] = useState('')
    const [telefono, setTelefono] = useState('')
    const [web, setWeb] = useState('')
    const [alerta, setAlerta] = useState({alerta:null, texto:null})
    
    async function enviarFormulario(e){
        e.preventDefault();
        const campos = [nombre, apellido, email, contraseña, confirmar_contraseña, telefono, web];
        console.log(campos);

        if(campos.some(campo=>campo=="")){
            setAlerta({
                error: true,
                texto: "Faltan Datos"
            })

            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return
        }
        
        if (contraseña !== confirmar_contraseña) {
            setAlerta({
                error: true,
                texto: "Las contraseñas no coinciden"                
            })

            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return
        }

        try {
            await axios.post('http://localhost:4000/api/veterinarios/registrar',{
                nombre:`${nombre} ${apellido}`,
                password: contraseña, 
                email: email,
                telefono: telefono,
                web: web
            })

            setAlerta({
                error:false,
                texto:"Registrado Correctamente"                
            })

            setNombre('')
            setApellido('')
            setEmail('')
            setContraseña('')
            setConfirmar_contraseña('')
            setTelefono('')
            setWeb('')
            
            setTimeout(() => {

                setAlerta({})
                
            }, 2000);

        } catch (error) {
            console.log(error);
        }
}

    return(
    <>
        <div>
            <h1 className="text-indigo-500 text-6xl font-semibold ">Crea tu cuenta y administra tus <span className="text-black ">Pacientes</span> </h1>
        </div>

        <form className='bg-white shadow-2xl p-10 rounded-xl space-y-3'
            onSubmit={enviarFormulario}>
                {
                    alerta.texto != undefined && 
                    <Alerta
                        {...alerta}
                    />  
                }


                    <div className="mt-5">                        
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Nombre</label>                
                        <input 
                            type="text" 
                            className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                        

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Apellido</label>                
                        <input type="text"  className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                            onChange={e=>setApellido(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >E-mail</label>
                        <input type="email" placeholder="email@ejemplo.com" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        onChange={e=>setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >contraseña</label>
                        <input type="password" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        onChange={e=>setContraseña(e.target.value)}/>
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >confirmar contraseña</label>
                        <input type="password" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        onChange={e=>setConfirmar_contraseña(e.target.value)}/>
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Telefono</label>
                        <input type="tel" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        onChange={e=>setTelefono(e.target.value)}/>
                    </div>

                    <div>
                        <label className="uppercase font-semibold text-gray-600 block text-xl mb-2" >Web</label>
                        <input type="url" placeholder="http://" className="border bg-gray-100 border-gray-300 rounded-md w-full p-0.5 pl-3"
                        onChange={e=>setWeb(e.target.value)}/>
                    </div>
                    
                    <div className="flex justify-center">
                        <input 
                            type="submit" 
                            value="Crear cuenta" 
                            className="uppercase text-white text-center font-bold border bg-indigo-500 border-gray-300 rounded-xl w-full text-2xl p-3 mt-5 hover:cursor-pointer
                            hover:bg-indigo-800 active:bg-indigo-500"                            
                        />
                    </div>

                    <nav className='mt-5 lg:flex lg:justify-between'>
                        <Link className='text-gray-600 hover:underline' to='/'>Iniciar sesion</Link>
                        <Link className='text-gray-600 hover:underline'  to='/olvide-password'> Recuperar contraseña </Link>
                    </nav>                
            </form>   
    </>
    )
}

export default Registrar