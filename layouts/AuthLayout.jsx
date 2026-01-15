import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth.jsx'

const AuthLayouth = ()=>{
    const { auth } = useAuth()

    if (auth?._id) return <Navigate to="/admin" />

    return(
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 p-10 mt-12 gap-5 items-center" >                
                <Outlet />
            </main>            
        </>
    )
}

export default AuthLayouth