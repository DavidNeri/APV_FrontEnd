import VeterinariosAPI from '../config/veterinariosAPI';
async function handleSubmit(form, userId, token){
    
    try {
        const {status,data} = await VeterinariosAPI.post('/api/pacientes/',form,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })

        if (status == 200) {
            return({
                error:false,
                texto:'Paciente Agregado',
                paciente: data
            })        
        }  
    
    } catch (error) {        

        return({
            error:true,
            texto: `${error.name} - ${error.message}`
        })
    }
}

export default handleSubmit



