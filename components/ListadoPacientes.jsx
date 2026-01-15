import usePacientes from "../hooks/usePacientes"
import { useEffect } from "react"
import CardPacientes from "./CardPacientes"

const ListadoPacientes = () => {
    const { lstpacientes, setCargarPacientes } = usePacientes()

    useEffect(()=>{
        setCargarPacientes(true)
    },[lstpacientes, setCargarPacientes])    

    return (
        <div>
            {
                lstpacientes.map(
                    paciente=>{
                        return(
                            <CardPacientes
                                key={paciente._id}
                                paciente={paciente}
                            />
                        )
                    }
                )
            }
        </div>
        
    )
}

export default ListadoPacientes