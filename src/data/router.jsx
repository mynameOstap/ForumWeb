import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./layout"
import { Home } from "../pages/Home/home"
import { SlideProvider } from "../components/Home/slideContext"
import { Groups } from "../pages/Groups/groups"
import { About } from "../pages/About/about"
import { SiteRules } from "../pages/SiteRules/siteRules"
import { Contact } from "../pages/Contact/contact"
import { Members } from "../pages/Members/members"
import { GroupPage } from "../pages/Groups/groupPage"
import { Profile } from "../pages/Account/profile"

 

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
                    },
                    {
                        path:"/about",
                        element: <About/>

                    },
                    {
                        path:"/rules",
                        element:<SiteRules/>
                    },
                    {
                        path:"/contact",
                        element:<Contact/>
                    },
                    {
                        path:"/members",
                        element:<Members/>
                    },
                    {
                        path: "/groups/:groupId",
                        element:<GroupPage/>
                    },
                    {
                        path: "/profile",
                        element:<Profile/>
                    }
                ]
            }
        ])}   
        />
    )
}