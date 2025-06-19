import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/header"
import { Footer } from "../components/Footer/footer"



export const Layout = ({children}) => {
    return(
        <>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]"> 
        <Header/>
       
        {children}
        <Outlet/>
     
        <Footer/>
        </div>

        </>
    )
}