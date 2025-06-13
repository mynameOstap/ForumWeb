import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./layout"
import { Home } from "../pages/Home/home"
import { SlideProvider } from "../components/Home/slideContext"
import { Groups } from "../pages/Groups/groups"

 

export const Router = () => {

    return(
        <RouterProvider 
        router={createBrowserRouter([
            {
                path: "/",
                element: <Layout/>,
                children:[
                    {
                        index:true,
                        element:<SlideProvider><Home/></SlideProvider>
                    },
                    {
                        path: "/groups",
                        element: <Groups/>
                    }
                ]
            }
        ])}   
        />
    )
}