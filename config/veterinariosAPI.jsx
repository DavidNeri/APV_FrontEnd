import axios from 'axios'

const VeterinariosAPI = axios.create({
    baseURL:`${import.meta.env.VITE_URL_BASE_API}`
})

export default VeterinariosAPI