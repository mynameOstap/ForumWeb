import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/header"
import { Footer } from "../components/Footer/footer"



export const Layout = ({children}) => {
    return(
        <>
        <Header/>
        {children}
        <Outlet/>
        <Footer/>
        </>
    )
}