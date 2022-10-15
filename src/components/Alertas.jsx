
const Alertas = ({alerta}) => {
  return (
    <div className={`${alerta.error} ? ' p-3 md:text-white text-black text-2xl text-center ml-4' : 'bg-blue-600  mt-4' `}>
        {alerta.msg}
    </div>
  )
}

export default Alertas