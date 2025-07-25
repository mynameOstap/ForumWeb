import { useNavigate } from "react-router-dom"
import logo from "../../assets/userIcon.png"
import { useState } from "react"
import { Auth } from "../../pages/Auth/AuthModal"
import { useSelector, useDispatch } from "react-redux"
import { logoutThunk } from "../../pages/Auth/logoutThunk"
import arrowDown from "../../assets/Header/arrowDown.png"
import { ArrowDownModal } from "./arrowDownModal"
import { BurgerMenu } from "./burgerMenu"



const navLinks = [
  { path: "/", label: "Home" },
  { path: "/groups", label: "Groups" },
  { path: "/about", label: "About" },
  { path: "/rules", label: "Site Rules" },
  { path: "/contact", label: "Contact" },
  { path: "/members", label: "Members" },
];
export const Header = () => {
  const [open, setOpen] = useState(false)
  const [openArrow, setOpenArrow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLogged, user } = useSelector(state => state.authCheck);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate()
  return (
    <>
      <header className="sticky top-0  z-50 bg-black w-full ">
        <div className="p-8 text-white">
          <div className="flex lg:justify-center items-center justify-between mt-6 gap-6">
            <h1 className="text-2xl">Random Musing.</h1>

            <nav className="hidden lg:flex  gap-12 items-center  ">
              <div className="flex gap-4 cursor-pointer">
                {navLinks.map((link) => (
                  <a onClick={() => navigate(link.path)} className="hover:opacity-70">{link.label}</a>
                ))}
              </div>
              {isLogged ? (
                <div className="flex gap-2 items-center relative ">
                  <img src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : logo} alt="user icon" className="size-6" />
                  <a className="hover:opacity-70">Вітаю, {user?.name || "користувач"}!</a>
                  <img className={`size-6 cursor-pointer transition-transform duration-500 ${openArrow ? "rotate-180" : "rotate-0"}`} src={arrowDown} onClick={() => setOpenArrow(prev => !prev)} />
                  <ArrowDownModal open={openArrow} onClose={() => setOpenArrow(false)} />


                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <img src={logo} alt="user icon" className="size-6" />
                  <a onClick={() => setOpen(true)} className="hover:opacity-70 cursor-pointer">Log In</a>
                </div>
              )}

            </nav>
            <button
              className="lg:hidden flex flex-col gap-1.5 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className={`w-6 h-0.5 bg-white transform duration-600 ${menuOpen ? "rotate-315 translate-y-2":""}`}></span>
              <span className={`w-6 h-0.5 bg-white transform duration-600 ${menuOpen ? "opacity-0":"opacity-100"}`}></span>
              <span className={`w-6 h-0.5 bg-white transform duration-600 ${menuOpen ? "-rotate-315 -translate-y-2":""}`}></span>
            </button>
          </div>
        </div>
      </header>
      <Auth open={open} onClose={() => setOpen(false)} />
       <BurgerMenu
        navLinks={navLinks}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isLogged={isLogged}
        user={user}
        API_BASE_URL={API_BASE_URL}
        setOpen={setOpen}
      />
    </>
  )
}
