import { useEffect, useState } from "react";



export const CreateGroups = ({ open, onClose }) => {

     const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
          document.body.style.overflow = "";
        };
      }, [open]);
    
      if (!open) return null;
    return (
        <>
            <section
                className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50"
                onClick={onClose}
            >
                <div
                    className="relative bg-gray-900 p-6 rounded w-[38rem] h-[40rem] flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-white text-2xl mb-4">
                        Create a Group
                    </h2>
                    <div className="flex  w-[100%] h-[50%] justify-center items-center border border-white border-dashed p-4">
                        <div className="flex justify-center items-center  ">
                        <button

                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Upload Image
                        </button>
                    </div>
                    </div>
                    

                    <input
                        type="text"
                        placeholder="Group Name"
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


                    <div className="flex gap-4 justify-end mt-4 cursor-pointer">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Create
                        </button>
                    </div>


                </div>
            </section>
        </>
    );
}