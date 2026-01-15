import usePacientes from "../hooks/usePacientes";

const BtnEditarPaciente = ({paciente}) => {

  const { setForm, setFrmAction, setIdPaciente} = usePacientes();  

  function editar(paciente){

    setForm({
      nombre: paciente.nombre,
      propietario: paciente.propietario,
      email: paciente.email,
      fecha: paciente.fecha.split('T')[0],
      sintomas: paciente.sintomas
    })
    
    setIdPaciente(paciente._id)
    setFrmAction('Actualizar')


  }

  return (
      <input
          className="border-gray-200 shadow-sm shadow-black rounded p-1 w-sm bg-indigo-500
          font-bold text-gray-100  text-shadow-md                                   
          hover:cursor-pointer
          hover:text-shadow-black
          hover:bg-amber-500 transition-colors duration-70
          active:bg-indigo-800
          h-full"

          type='button'
          value='Editar'
          onClick={()=>{editar(paciente)}}                                    
      />
  )
}

export default BtnEditarPaciente