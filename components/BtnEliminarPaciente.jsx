import VeterinariosAPI from "../config/veterinariosAPI";
import useAuth from "../hooks/useAuth";
import usePacientes from "../hooks/usePacientes";

const BtnEliminarPaciente = ({id}) => {
  const { token } = useAuth()
  const { setLstpacientes, lstpacientes } = usePacientes()

  function eliminarPaciente(id){

    console.log(`El paciente id ${id}`);
    console.log(token);

    const respuesta = VeterinariosAPI.delete(`/api/pacientes/eliminar/${id}`,{
      headers:{
        "Content-Type":'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(respuesta=>(
      {
        error: false,
        texto: 'Paciente eliminado',
        paciente: respuesta.data
      })

    ).catch(err=>err)

    console.log(lstpacientes);
    setLstpacientes(prev=>
      prev.filter(p=> p._id != id)
    )





  }

  return (
   <input
          className="border-gray-200 shadow-sm shadow-black rounded p-1 w-sm bg-red-500
          font-bold text-gray-100  text-shadow-md                                   
          hover:cursor-pointer
          hover:text-shadow-black
          hover:bg-amber-500 transition-colors duration-70
          active:bg-indigo-800
          h-full"

          type='button'
          value='Eliminar'
          onClick={()=>{eliminarPaciente(id)}}                                
      />
  )
}

export default BtnEliminarPaciente