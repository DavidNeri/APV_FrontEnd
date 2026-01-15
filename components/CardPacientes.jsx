import React from 'react'
import BtnEditarPaciente from './BtnEditarPaciente.jsx'
import BtnEliminarPaciente from './BtnEliminarPaciente.jsx'

const CardPacientes = ({paciente}) => {
  return (
    <div className="border-gray-200 shadow-sm bg-white m-5 p-10 w-md, rounded-md, space-y-5 h-auto">

      <h1 className="font-extrabold text-center uppercase">{paciente.nombre}</h1>
      <p><span className="font-bold">Propietario: </span>{paciente.propietario}</p>
      <p><span className="font-bold">Email: </span>{paciente.email}</p>
      <p><span className="font-bold">Fecha: </span>{Intl.DateTimeFormat('Es-Es',
        {
          day:"2-digit",
          month:"2-digit",
          year:"numeric"
        })
        .format(new Date(paciente.fecha))}
      </p>

      <p><span className="font-bold">Sintomas: </span>{paciente.sintomas}</p>

      <div className="mt-10 space-x-5 h-10">

        <BtnEditarPaciente 
          paciente={paciente}
        />

        <BtnEliminarPaciente 
          id={paciente._id}
        />



          
      </div>
  </div>

  )
}

export default CardPacientes