import { useRef, useState } from "react";
import { useEffect } from "react";
import unknowImg from "../../assets/Group/unknowImg.png";
import trash from "../../assets/Group/trash.png"
import arrow_round from "../../assets/Group/arrow_round.png"
import axiosInstance from "../../api/axiosInstance";


export const GroupSettings = ({ open, onClose, group,fetchData }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [render, setRender] = useState(false)
    const [activeTab, setActiveTab] = useState("Info")
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const [avatar, setAvatar] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [privacy, setPrivacy] = useState("public");
    const [groupname, setGroupname] = useState("");

    
    const [loading, setLoading] = useState(false)
    const underlineRef = useRef({})
    const fileInputRef = useRef()

  useEffect(() => {
    if (open) {
        setGroupname(group.name);
        setPrivacy(group.privacy);
        if(group.avatarUrl)
        {
            setAvatar(`${API_BASE_URL}${group.avatarUrl}`);

        }
        setSelectedFile(null);
    }
}, [open]);

    const handleUploadAvatar = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatar(previewUrl)
            setSelectedFile(file)
        }
    }

    const handleDeleteAvatar = async () => {
        try {
            setAvatar(null);
            await axiosInstance.post(`delete-group-avatar/${id}`)
        }
        catch (e) {
            console.error(e)
        }
    }

    const handleClickDelete = () => {
        setAvatar(null)
    }

  const handleSubmit = async () => {
    try {
        setLoading(true);

        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);
            await axiosInstance.post(
                `/upload-group-avatar/${group.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        }
        if(!avatar)
        {
            await axiosInstance.delete(`/delete-group-avatar/${group.id}`);   
        }

        
        await axiosInstance.put(`/update-group-info/${group.id}`, {
            name: groupname,
            privacy,
        });
        await fetchData()
        onClose(); 
    } catch (e) {
        console.error("Error submitting group settings:", e);
    } finally {
        setLoading(false);
    }
};

    const recalc = () => {
        const el = underlineRef.current[activeTab];
        if (el) {
            setUnderlineStyle({
                left: el.offsetLeft,
                width: el.offsetWidth,
            });
        }
    };
    useEffect(() => {
        if (render) {
            const raf = requestAnimationFrame(() => {
                recalc();
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [activeTab, render]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        let timeoutId;

        if (open) {
            setRender(true)
        }
        else (
            timeoutId = setTimeout(() => setRender(false), 500)
        )
        return () => clearTimeout(timeoutId)
    }, [open])
    if (!render && !open) return null
    return (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-end items-center z-50">
            <div className={`bg-white h-full w-[25rem] shadow-lg transition-transform duration-500 ease-in-out flex flex-col relative ${open && render ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="text-xl font-semibold mb-4">Group Settings</h2>
                <div className="border-b border-gray-500 relative">
                    <div className="flex justify-between px-8 ">
                        <div className="text-xl cursor-pointer" onClick={() => setActiveTab("Info")} ref={(cur) => underlineRef.current['Info'] = cur}>Info</div>
                        <div className="text-xl cursor-pointer" onClick={() => setActiveTab("Admin Tools")} ref={(cur) => underlineRef.current['Admin Tools'] = cur}>Admin Tools</div>
                    </div>

                    <span className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out " style={{
                        left: underlineStyle.left,
                        width: underlineStyle.width,
                    }}></span>

                    <div></div>
                </div>
                {activeTab === "Info" ? (
                    <div className="flex flex-col px-5 justify-center pt-6 space-y-4">
                        <div className="relative group flex items-center justify-center border border-black border-dashed p-4 w-full h-[30vh]">
                            {avatar ? (
                                <>
                                    <img src={avatar} className="w-full h-full object-contain" alt="Avatar" />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2 cursor-pointer">
                                        <img src={arrow_round} onClick={handleUploadAvatar} className="w-12 h-12 bg-white p-2 rounded-full" alt="Edit" />
                                        <img src={trash} onClick={handleClickDelete} className="w-12 h-12 bg-white p-2 rounded-full" alt="Delete" />
                                    </div>
                                </>
                            ) : (
                               
                                    <button
                                        className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition"
                                        onClick={handleUploadAvatar}
                                    >
                                        Upload Image
                                    </button>

                              

                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <div  className="flex flex-col">
                        <div className="">Group Name</div>
                        <input
                        type="text"
                        placeholder="Group Name"
                        value={groupname}
                        onChange={(e) => setGroupname(e.target.value)}
                        className="border border-gray-600 px-4 py-2 rounded text-black bg-transparent outline-none"
                    />
                        </div>
                      
                    <div className="flex flex-col">
                        <div className="">Privacy</div>
                        <select
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="border border-gray-600 px-4 py-2 rounded text-black bg-transparent outline-none "
                    >
                        <option value="public" className="text-black">Public</option>
                        <option value="private" className="text-black">Private</option>
                    </select>
                    </div>
                    
                    </div>
                ) : null}


                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                    <button className="border border-black p-2 px-10 bg-black text-white hover:bg-white hover:text-black cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="border border-black p-2 px-10 hover:bg-black hover:text-white cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    )
}