import { useEffect, useState } from "react";

const MAX_LENGTH = 300


export const ReportModal = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const isLimitReached = title.length >= MAX_LENGTH;

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) {
        return null
    }
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50 ">
                <div className="absolute mt-2 w-[30%] h-[30%] bg-white z-50 text-black border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex  flex-col p-2 ">
                        <div className="flex justify-between p-2">
                            <div className="text-2xl font-bold">Write your report</div>
                            <div className="cursor-pointer" onClick={()=>{onClose();setTitle("")}}>X</div>
                        </div>
                        <div className="w-full relative">
                            <textarea
                                value={title}
                                placeholder="Place write your report..."
                                className={`w-[90%] h-[90%] px-4 py-2 text-black focus:outline-none resize-none rounded ${isLimitReached ? "text-red-500" : ""}`}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_LENGTH) {
                                        setTitle(e.target.value);
                                    }

                                }}
                                rows={6}
                            />
                            <div className={`absolute right-2 top-3 text-sm ${isLimitReached ? "text-red-500 font-semibold" : "text-gray-500"
                                }`}>
                                {title.length}/{MAX_LENGTH}
                            </div>
                            <div className="flex justify-end">
                                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                    Send
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}