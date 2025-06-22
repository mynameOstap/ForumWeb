import { useEffect, useState } from "react";

export const Login = ({ open, onClose }) => {
  const [register, setRegister] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);



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
          {register ? "Register" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
        />

        {register && (
          <input
            type="password"
            placeholder="Confirm password"
            className="border border-gray-600 px-4 py-2 rounded text-white bg-transparent outline-none"
          />
        )}

        <div className="text-gray-400 text-sm">
          {register ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setRegister(false)}
              >
                Log in
              </span>
            </>
          ) : (
            <>
              If you don't have an account, please{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setRegister(true)}
              >
                register
              </span>
              .
            </>
          )}
        </div>


        <div className="flex gap-4 justify-end mt-4 cursor-pointer">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            {register ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </section>
  );
};
