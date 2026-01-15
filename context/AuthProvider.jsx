import { createContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import VeterinariosAPI from "../config/veterinariosAPI"


const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [token, setToken] = useState()
    const [authReady, setAuthReady] = useState(false)

    const cerrarSesion = ()=>{
        sessionStorage.removeItem('APV_token')
        setAuth({})
        setToken()
    }

    const iniciarSesion = (token)=>{
        sessionStorage.setItem('APV_token',token)
        setToken(token)

    }

    useEffect(()=>{
        const obtenerPerfil = async ()=>{
        
            const tokenLS =sessionStorage.getItem('APV_token')
            setToken(tokenLS)

            if (!tokenLS) {
                setAuthReady(true)
                setAuth(null)
                return
            }    
            
            try {
                const response = await VeterinariosAPI('/api/veterinarios/perfil',{
                        headers:{
                            "Content-Type":"application/json",
                            Authorization: `Bearer ${tokenLS}`
                        }
                    }
                )
                setAuth(response.data);
            
            } catch (error) {
                console.log(error.response?.data || error.message);

                setAuth({})
                sessionStorage.removeItem('APV_token')
                setToken(null)
            }finally{
                setAuthReady(true)
            }
        }
        obtenerPerfil()

    }, [token])

    if (!authReady) return null


    
    return(
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    setAuthReady,
                    token,
                    cerrarSesion,
                    iniciarSesion
                    
                }
            }
        >
            {children}
        </AuthContext.Provider>

    )
}

export{
    AuthProvider
}

export default AuthContext

