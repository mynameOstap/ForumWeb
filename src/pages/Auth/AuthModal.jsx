import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 
import { useSelector,useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { Spinner } from "../../components/Loader/Spinner";

export const Auth = ({ open, onClose }) => {
  const [register, setRegister] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
    const {isLogged,user} = useSelector(state => state.authCheck); 

  const onCloseHandler = () =>{
    onClose();
    setUsername("")
    setPassword("")
    setConfirm("")
  }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true)
    setError("");

    if (!username || !password || (register && !confirm)) {
      setError("Please fill out all forms.");
      return;
    }

    if (register && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      if (register) {
        const res = await axiosInstance.post("/register", {
          name: username,
          password,
        });
        console.log("Register done:", res.data);
      } else {
        const res = await axiosInstance.post("/login", {
          name: username,
          password,
        });
        dispatch(loginSuccess(res.data.user));
        localStorage.setItem("refreshToken",res.data.refreshToken)
        console.log("Login done:", res.data);
      }

      setUsername("");
      setPassword("");
      setConfirm("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server erroe.");
    }
    finally
    {
      setLoading(false)
    }
  };

  if (!open) return null;

  return (
    <section
      className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 p-6 rounded w-[400px] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-2xl mb-4">
          {register ? "Реєстрація" : "Вхід"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
        />

        {register && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
          />
        )}

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="text-gray-400 text-sm">
          {register ? (
            <>
              Do you have account?{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => {
                  setRegister(false);
                  setError("");
                }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account??{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => {
                  setRegister(true);
                  setError("");
                }}
              >
                Register
              </span>
              .
            </>
          )}
        </div>

        <div className="flex gap-4 justify-end mt-4 cursor-pointer">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={()=> onCloseHandler()}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {isLoading ? (<Spinner size={12}/>) : ((register ? "Register" : "Login"))}
          </button>
        </div>

      
      </div>
    </section>
  );
};
