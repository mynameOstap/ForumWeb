import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../pages/Auth/logoutThunk"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ArrowDownModal = ({ open,onClose}) => {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector(state => state.authCheck);
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    let timeoutId;
    if (open) {
      setRender(true);
      timeoutId = setTimeout(() => setShow(true), 100);
    } else {
      setShow(false);
      timeoutId = setTimeout(() => setRender(false), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [open]);
  if (!render) return null;
  const navigateToProfile = () => {
    setShow(false)
    onClose()
    navigate("/profile")
    setTimeout(()=>{
      setRender(false)
      
    },500)
  }

  return (
    <div className={`absolute top-10 right-0  text-white   z-50 transition-all duration-500 ${show ? "opacity-100 pointer-events-auto translate-y-4" : "opacity-0 pointer-events-none translate-y-0"
      }`}>
      <ul className="flex flex-col gap-2">
        <li className="cursor-pointer hover:text-gray-800 p-1" onClick={navigateToProfile}>Profil</li>
        <li className="cursor-pointer hover:text-gray-800 p-1">Settings</li>
        <li className="cursor-pointer hover:text-gray-800 p-1" onClick={() => dispatch(logoutThunk())}>Log out</li>
      </ul>
    </div>
  );
};
