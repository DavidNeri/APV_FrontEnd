import VeterinariosAPI from "../config/veterinariosAPI";

const recuperarContaseña = async ({contraseña, token}) => {

    try {
        const response = await VeterinariosAPI.post(`/api/veterinarios/olvide-password/${token}`,{contraseña})
        console.log(response);

        if (response.status != 200) {
            return{
                error: true,
                texto: `Error ${response.status} - ${response.statusText}`
            }          
        }else{
            return{
                error: false,
                texto:response.statusText
            }
        }
    } catch (error) {
        return{
            error: true,
            texto: `Error ${error.response.status}: ${error.response.data}`
        }
    }

}

export default recuperarContaseña