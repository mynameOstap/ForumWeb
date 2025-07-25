import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/userIcon.png"
import axiosInstance from "../../api/axiosInstance";
import { useRef, useState } from "react";
import { Spinner } from "../../components/Loader/Spinner";
import { loginSuccess } from "../../store/authSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const Profile = () => {
    const dispatch = useDispatch();
    const { isLogged, user } = useSelector(state => state.authCheck);
    const [loading,setLoading] = useState(false)

    const fileInputRef = useRef(null);

    const handleClickAvatarEdit = () => {
        fileInputRef.current.click()
    }

    const handleFileChanged = async (e) => {
        const file = e.target.files[0]
        if (!file)
            return;
        const formData = new FormData();
        formData.append("avatar", file)
        try {
            setLoading(true)
            const res = await axiosInstance.post("/upload-avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            if (res) {
                dispatch(loginSuccess(res.data.user))
            }
        }
        catch (e) {
            console.error(e)
        }
        finally
        {
            setLoading(false)
        }

    }
    return (
        <>
            <section className="flex bg-black  h-full justify-center">
                <div className="w-[40%] text-white space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-6 ]">
                            <img src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : userIcon} className="rounded-full h-[5rem] w-[5rem]" />
                            <div>{user?.name}</div>
                        </div>
                        <button className="border border-white  hover:bg-white hover:text-black p-2 transition h-[2.5rem] cursor-pointer"
                        onClick={handleClickAvatarEdit}>
                        {loading ?  (<Spinner/>) : ("Edit Avatar")}
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChanged}
                            className="hidden"
                        />
                    </div>
                    <div className="w-[95%]">
                        <div className="space-y-8">
                            <div className="border-b-3 p-3 inline-block">Profile</div>
                            <div className="flex justify-between items-center">
                                <div className="text-2xl font-bold">Profile</div>
                                <button className="border border-white  hover:bg-white hover:text-black p-2 transition ">
                                Edit Details"
                                </button>
                            </div>
                        </div>
                        <div>Join date: {user?.createdAt || "unknown"}</div>
                        <div className="space-y-6">
                            <div className="border-b pb-6 border-gray-600"></div>
                            <div>About</div>
                            <textarea
                                placeholder="Type your message here..."
                                rows={4}
                                className="border  w-[100%] px-4 py-2  text-white "
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}