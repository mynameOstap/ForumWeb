import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { CommentCard } from "./commentCard";

export const CommentModal = ({ open, onClose, comments, id, fetchComment }) => {
    const [commentText, setCommentText] = useState("");

    const handleSendComment = async () => {
        try {
            await axiosInstance.post(`posts/${id}/comment`, { text: commentText });
            setCommentText("");
            await fetchComment();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <section
            className={`fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-end z-50 transition-transform duration-500 ${
                open ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="relative lg:w-[50%] h-[80vh]  text-white rounded-t-4xl p-6 flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-3xl text-white hover:text-gray-300 cursor-pointer"
                >
                    &times;
                </button>
                <div className="text-center text-2xl font-bold mb-4">Comments</div>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border border-white rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSendComment}
                        className="ml-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition cursor-pointer"
                    >
                        Send
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {comments?.length > 0 ? (
                        comments.map((value) => (
                            <CommentCard
                                key={value.id}
                                createdAt={value.createdAt}
                                content={value.text}
                                author={value.userName}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-400">No comments yet.</div>
                    )}
                </div>
            </div>
        </section>
    );
};
