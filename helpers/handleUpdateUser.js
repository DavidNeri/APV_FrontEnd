import VeterinariosAPI from "../config/veterinariosAPI";


async function handleUpdateUser(userData, token){ 

    try {
        return VeterinariosAPI.post('/api/veterinarios/perfil',userData,{
            headers:{
                "Content-Type":'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            const { data } = response

            return({
                error: false,
                texto: 'Datos Actualizados',
                data: data
            })

        })
        .catch(err=>{
            const {message} = err.response.data;
            return ({
                error: true,
                texto: message
            })
        })

    } catch (err) {
        return({
            error: true,
            texto:err.message
        })
    }

}

export default handleUpdateUser