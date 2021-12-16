import Header from "./Header"
import React, {useState} from 'react'
import Footer from "./Footer"

export const OffsetContext = React.createContext()

const Layout = ({children}) => {
    const [offset, setOffset] = useState(0)
    return (
        <>
        <OffsetContext.Provider value={{offset, setOffset}}>
        <Header />
        {children}
        <Footer />
        </OffsetContext.Provider>
        </>
    )
}

export default Layout;