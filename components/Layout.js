import Header from "./Header"
import React, {useState} from 'react'

export const OffsetContext = React.createContext()

const Layout = ({children}) => {
    const [offset, setOffset] = useState(10)
    return (
        <>
        <OffsetContext.Provider value={{offset, setOffset}}>
        <Header />
        {children}
        </OffsetContext.Provider>
        </>
    )
}

export default Layout;