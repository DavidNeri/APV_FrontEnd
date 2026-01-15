import { createContext, useEffect, useState} from "react"
import VeterinariosAPI from '../config/veterinariosAPI'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider=({children})=>{
    const {token} = useAuth()
    const [lstpacientes, setLstpacientes] = useState([])
    const [cargarPacientes, setCargarPacientes] = useState(false)
    const [form, setForm] = useState({});
    const [frmAction, setFrmAction] = useState('Guardar')
    const [ idPaciente, setIdPaciente] = useState()

    useEffect(
        ()=>{
            if (!token || !cargarPacientes )return

            const ObtenerPacientes = async ()=>{
                const response = await VeterinariosAPI(`/api/pacientes/`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setLstpacientes(response.data)
            }
            ObtenerPacientes()
        },[token, cargarPacientes]
    )

    return (    
        <PacientesContext.Provider
            value={
                {
                    setCargarPacientes,
                    lstpacientes,
                    setLstpacientes,
                    form,
                    setForm,
                    frmAction,
                    setFrmAction,
                    idPaciente,
                    setIdPaciente
                }
            }
        >
            {children}
        </PacientesContext.Provider>

    )
}

export {
    PacientesProvider
}

export default PacientesContext;

