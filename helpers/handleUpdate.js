import VeterinariosAPI from '../config/veterinariosAPI'
async function handleUpdate(form, idPaciente, auth_id, token){
    const data  = {...form, idVeterinario: auth_id, _id: idPaciente}

    const response = VeterinariosAPI.post(`/api/pacientes/actualizar/${idPaciente}`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(respuesta=>{
        if(respuesta.status == 200){            
            return ({
                error:false,
                texto: respuesta.data.msg,
                paciente: data
            })

        }else{
            return ({
                error:true,
                texto:respuesta.data.msg

            })

        }
    })

    .catch(error=>{
        return  ({
            error: true,
            texto: error.response.data
        })
    })
    
    return response


}

export default handleUpdate