import { createContext, useState } from 'react';

const AlertaContext = createContext();

const AlertaProvider = ({children}) => {

    const[alerta, setAlerta] = useState({});

    return (
        <AlertaContext.Provider
            value= {{
                alerta,
                setAlerta
            }}
        >
            {children}
        </AlertaContext.Provider>
    )
}

export { AlertaProvider }
export default AlertaContext 