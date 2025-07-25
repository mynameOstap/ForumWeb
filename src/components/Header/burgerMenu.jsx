import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/userIcon.png";
import { logoutThunk } from "../../pages/Auth/logoutThunk";
import { useDispatch } from "react-redux";

export const BurgerMenu = ({ open, onClose, navLinks, isLogged, user, API_BASE_URL, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (path) => {
    navigate(path);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      className={`fixed top-0 left-0 lg:hidden w-full h-full bg-black flex justify-center z-49 transition-transform duration-500 ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col gap-8 cursor-pointer items-center justify-center">
       
        {navLinks.map((link) => (
          <a
            key={link.path}
            onClick={() => handleClick(link.path)}
            className="text-white hover:opacity-70"
          >
            {link.label}
          </a>
        ))}

        {isLogged ? (
          <div className="flex flex-col items-center gap-2 mt-10">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : logo}
                alt="user icon"
                className="size-6"
              />
              <span className="text-white">Вітаю, {user?.name || "користувач"}!</span>
            </div>
            <a className="cursor-pointer text-white hover:text-gray-800 p-1" onClick={()=>handleClick("/profile")}>Profil</a>

            <button
              onClick={() => {
                dispatch(logoutThunk());
                onClose();
              }}
              className="px-1 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              onClose();
              setOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-10"
          >
            Log In
          </button>
        )}
      </div>
    </section>
  );
};
