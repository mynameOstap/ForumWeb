import { useNavigate } from "react-router-dom"
import logo from "../../assets/userIcon.png"
import { Login } from "../../pages/Auth/loginModal"
import { useState } from "react"

export const Header = () => {
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
    <header className="sticky top-0  z-50 bg-black w-full min-h-24">
      <div className="p-8 text-white">
        <div className="flex justify-center mt-6 gap-[10%]">
          <h1 className="text-2xl">Random Musing.</h1>

          <nav className="flex gap-12 items-center  ">
            <div className="flex gap-4 cursor-pointer">
              <a onClick={()=> navigate("/")} className="hover:opacity-70">Home</a>
              <a onClick={()=> navigate("/groups")} className="hover:opacity-70">Groups</a>
              <a onClick={()=> navigate("/about")} className="hover:opacity-70">About</a>
              <a onClick={()=> navigate("/rules")} className="hover:opacity-70">Site Rules</a>
              <a onClick={()=> navigate("/contact")} className="hover:opacity-70">Contact</a>
              <a onClick={()=> navigate("/members")} className="hover:opacity-70">Members</a>
            </div>
            <div className="flex gap-2 items-center">
              <img src={logo} alt="user icon" className="size-6" />
              <a onClick={()=>setOpen(true)} className="hover:opacity-70 cursor-pointer">Log In</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <Login open={open} onClose={()=>setOpen(false)} />
    </>
  )
}
