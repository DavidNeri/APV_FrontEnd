const Alerta = (props)=>{

    return(
        <>
            <div
                className={`${props.error ? "bg-red-500" : "bg-indigo-500"} text-white  text-2xl font-bold p-3 rounded-xl flex justify-center w-full`}
                
            >
                {props.texto}
                
            </div>
        </>
    )
}


export default Alerta