import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Spinner } from "../../components/Loader/Spinner";

const MAX_LENGTH= 20

export const CreateGroups = ({ open, onClose,getGroups }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [groupname, setGroupname] = useState("");
    const [privacy, setPrivacy] = useState("public");
    const [loading, setLoading] = useState(false)
    const [preview,setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const isLimited = groupname.length >= MAX_LENGTH;
    const handleUploadAvatar = () =>{
        fileInputRef.current.click()
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0]
        if(file)
        {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl)
            setSelectedFile(file)
        }
    }



    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);
   const CreateGroupHandler = async () => {
  

  const formData = new FormData();
  formData.append("image", selectedFile);

  try {
    setLoading(true)
    const res = await axiosInstance.post("/create-group", {
      name: groupname,
      privacy: privacy
    });

    if (res && res.data?.id) {
      await axiosInstance.post(
        `/upload-group-avatar/${res.data.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    await getGroups();
    onClose();
    setGroupname("");
    setPrivacy("public");
    setPreview(null);
    setSelectedFile(null);
  } catch (e) {
    console.error(e);
  }
  finally
  {
    setLoading(false)
  }
};

    const onCloseHandler = () => {
        onClose();
        setGroupname("")
        setPrivacy("")
        setPreview(null)
    }

    if (!open) return null;
    return (
        <>
            <section
                className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50"
            
            >
                <div
                    className="relative bg-white p-6 rounded w-[38rem] h-[40rem] flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-black text-2xl mb-4">
                        Create a Group
                    </h2>
                    <div className="flex  w-full h-[50%] justify-center items-center border border-black border-dashed p-4">
                        {preview ? (<img className="h-full w-full object-cover" src={preview}/>) : (
                             <div className="flex justify-center items-center  ">
                            <button

                                className="px-4 py-2  border border-black  text-black hover:bg-black  hover:text-white transition"
                                onClick={handleUploadAvatar}
                            >
                                Upload Image
                            </button>
                               <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        </div>
                        )}
                        
                       
                    </div>

                    <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={groupname}
                        onChange={ (e) => {if(e.target.value.length <= MAX_LENGTH) {setGroupname(e.target.value)}} }
                        className="w-full border border-gray-600 px-4 py-2 rounded text-black bg-transparent outline-none"
                    />
                     <div className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm ${isLimited ? "text-red-500 font-semibold" : "text-gray-500"
                                }`}>
                                {groupname.length}/{MAX_LENGTH}
                            </div>
                    </div>

                    <select
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="border border-gray-600 px-4 py-2 rounded text-black bg-transparent outline-none "
                    >
                        <option value="public" className="text-black">Public</option>
                        <option value="private" className="text-black">Private</option>
                    </select>


                    <div className="flex gap-4 justify-end mt-4 cursor-pointer">
                        <button
                            className="px-4 py-2 border border-black bg-black text-white hover:bg-white  hover:text-black transition  "
                            onClick={()=> onCloseHandler()}
                        >
                            Close
                        </button>
                        <button
                            className="px-4 py-2 border border-black  text-black hover:bg-black  hover:text-white transition "
                            onClick={() => CreateGroupHandler()}
                        >
                            {loading ? (<Spinner/>) : ("Create")}
                            
                        </button>
                    </div>


                </div>
            </section>
        </>
    );
}