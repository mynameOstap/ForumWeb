import { useDispatch, useSelector } from "react-redux";
import unknowImg from "../../assets/Group/unknowImg.png"
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import image from "../../assets/Group/image.png"


const MAX_LENGTH = 120;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const WriteMessageGroup = ({ open, onClose, selectedGroup, fetchPost }) => {
    const dispatch = useDispatch();
    const { isLogged, user } = useSelector(state => state.authCheck);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const isLimitReached = title.length >= MAX_LENGTH;

    const fileInputRef = useRef(null);
    const handleUploadAvatar = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl)
            setSelectedFile(file)
        }
    }



    const createPost = async () => {
        setLoading(true)
        const formData = new FormData;
        formData.append("image", selectedFile)

        try {
            const res = await axiosInstance.post(`/create-post/${selectedGroup.groupId}`, { title, content })
            if (res && res.data?.id) {
                await axiosInstance.post(
                    `/upload-post-img/${res.data.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } })
      
            await fetchPost()

            onClose()}
        }
        catch (error) {
                console.error("Failed to fetch groups:", error);

            }
            finally {
                setLoading(false)
            }
        }

    const handleClose = () => {
            setTitle("")
            setContent("")
            setPreview("")
            setSelectedFile("")
            onClose()
        }

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
                    className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50 "
                >
                    <div
                        className="relative bg-white p-6 rounded w-[38rem] h-[40rem] flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between w-full  text-black py-4 cursor-pointer px-4 ">
                            <div className="flex items-center">
                                <img
                                    src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : unknowImg}
                                    alt={user.name}
                                    className="rounded-full object-cover w-[3.5rem] h-[3.5rem]"
                                />
                                <div className="flex ml-4">
                                    <div className="flex flex-col text-sm text-gray-600">
                                        <h1 className="text-black">{user.name || "Noname"}</h1>
                                        <h1>create a post in {selectedGroup.groupName || "yaloh"}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer text-2xl font-bold" onClick={() => onClose()}>X</div>
                        </div>

                        <div className="w-full relative">
                            <input
                                type="text"
                                value={title}
                                placeholder="Name"
                                className={`w-[90%] px-4 py-2 text-black focus:outline-none ${isLimitReached ? "text-red-500" : ""
                                    }`}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_LENGTH) {
                                        setTitle(e.target.value);
                                    }
                                }}
                            />
                            <div className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm ${isLimitReached ? "text-red-500 font-semibold" : "text-gray-500"
                                }`}>
                                {title.length}/{MAX_LENGTH}
                            </div>
                        </div>

                        <textarea
                            placeholder="Type your message here..."
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full h-[60%] px-4 py-2 text-black focus:outline-none"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {preview ? (
                            <div className="relative h-[8rem] w-[8rem]">
                                <img src={preview} className="w-full h-full object-cover rounded" />
                                <div
                                    className="absolute top-0 right-0 text-white w-5 h-5 cursor-pointer "
                                    onClick={() => setPreview(null)}
                                >
                                    X
                                </div>
                            </div>
                        ) : (<img src={image} onClick={handleUploadAvatar} className="h-[1.5rem] w-[1.5rem] cursor-pointer" />)}

                        <div className="flex gap-4 justify-end mt-4 cursor-pointer">
                            <button
                                className="px-4 py-2 border border-black bg-black text-white hover:bg-white  hover:text-black transition  "
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 border border-black  text-black hover:bg-black  hover:text-white transition "
                                onClick={() => createPost()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    };
