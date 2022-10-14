
const Alertas = ({alerta}) => {
  return (
    <div className={`${alerta.error} ? ' p-3 text-white text-2xl text-center' : 'bg-blue-600  mt-4' `}>
        {alerta.msg}
    </div>
  )
}

export default Alertas