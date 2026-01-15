import VeterinariosAPI from "../config/veterinariosAPI"


const handleChangePassword = async (actual, nueva, email, ) => {

  const data = {
    email: email,
    password: actual
  }

  try {
    const { status } = await VeterinariosAPI.post('/api/veterinarios/login',data)

    if (status==200) {
      data.password = nueva
      const response = await VeterinariosAPI.post(`/api/veterinarios/cambiar-contrasena`,data)

      if (response.status==200) {
        return({
          error: false,
          texto: response.data
        })
      }
    }

  } catch (error) {
    return ({
      error: true,
      texto: error.response.data
    })    
  }
  


  

  
  
  

}

export default handleChangePassword