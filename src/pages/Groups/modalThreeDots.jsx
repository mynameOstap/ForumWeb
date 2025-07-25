import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { ReportModal } from "./reportModal";
import { useState } from "react";


export const ThreeDotsModal = ({ role, open, onClose, onGroupSettingClick }) => {
    if (!open)
        return null;
    return (
        <div className="absolute  right-0 mt-2 bg-white z-50 text-black border border-gray-200 rounded-lg shadow-lg min-w-[8rem] max-w-[20rem]">
            {(role == "Owner" || role == "Administrator") ? (
                <div className="flex flex-col p-2 ">
                    <div className="flex  rounded cursor-pointer hover:bg-gray-100" onClick={() => onGroupSettingClick()}>Group Setting</div>
                    <div className="flex  rounded cursor-pointer hover:bg-gray-100 text-red-600">Delete</div>
                </div>
            ) : (
                <div className=" flex ">
                    <div>Soon</div>
                </div>
            )}
        </div>
    )
}



export const ThreeDotsModalPost = ({ open, onClose, authorId, postId, fetchPost, openReport }) => {
    const { user } = useSelector(state => state.authCheck);

    const deletePost = async () => {
        try {
            await axiosInstance.delete(`posts/${postId}/delete`);
            fetchPost();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    if (!open || !user) return null;

    return (
        <div className="absolute right-0 mt-2 bg-white z-50 text-black border border-gray-200 rounded-lg shadow-lg min-w-[8rem] max-w-[20rem]">
            {user.id != authorId ? (
                <div className="flex flex-col p-2">
                    <div
                        className="flex rounded cursor-pointer hover:bg-gray-100 text-red-600"
                        onClick={deletePost}
                    >
                        Delete
                    </div>
                </div>
            ) : (
                <div className="flex p-2">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            onClose();
                            openReport();
                        }}
                    >
                        Report
                    </div>
                </div>
            )}
        </div>
    );
};
