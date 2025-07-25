import unknowImg from "../../assets/Group/unknowImg.png";
import { formatDistanceToNow } from "date-fns";
import pressedLikes from "../../assets/Group/pressedLikes.png";
import likes from "../../assets/Group/likes.png";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import commentIcon from "../../assets/Group/comment.png";
import { CommentModal } from "./commentModla";
import { useSelector } from "react-redux";
import threeDots from '../../assets/Group/threeDots.png';
import { ThreeDotsModalPost } from "./modalThreeDots";
import { ReportModal } from "./reportModal";

export const PostCardGroup = ({
    id,
    createdAt,
    groupName,
    title,
    content,
    author,
    like,
    isLikedByUser,
    image,
    authorId,
    fetchPost
}) => {
    const [postLike, setPostLike] = useState(isLikedByUser);
    const [likesCount, setLikesCount] = useState(like);
    const [comments, setComments] = useState([]);
    const [openComment, setOpenComment] = useState(false);
    const [openThreeDots, setOpenThreeDots] = useState(false);
    const [openReportModal, setOpenReportModal] = useState(false);

    const { user } = useSelector(state => state.authCheck);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchComments = async () => {
        try {
            const res = await axiosInstance.get(`/posts/${id}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenComments = () => {
        fetchComments();
        setOpenComment(true);
    };

    const pressLike = async () => {
        try {
            const resLike = await axiosInstance.post(`posts/${id}/like`);
            setPostLike(resLike.data);
            setLikesCount(prev => prev + (resLike.data ? 1 : -1));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <section className="flex flex-col gap-4 w-full bg-black text-white py-4 px-4 transition border border-white">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : unknowImg}
                            alt={author || "unknown"}
                            className="rounded-full object-cover w-[3.5rem] h-[3.5rem]"
                        />
                        <div className="flex flex-col text-sm">
                            <span className="font-semibold">{author || "Unknown"}</span>
                            <span className="text-gray-400">
                                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })} in {groupName}
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src={threeDots}
                            alt=""
                            onClick={() => setOpenThreeDots(prev => !prev)}
                            className="cursor-pointer"
                        />
                        <ThreeDotsModalPost
                            open={openThreeDots}
                            onClose={() => setOpenThreeDots(false)}
                            authorId={authorId}
                            postId={id}
                            fetchPost={fetchPost}
                            openReport={() => setOpenReportModal(true)}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="text-base mt-1 text-gray-300 break-words">{content}</p>
                </div>
                {image && (<img src={`${API_BASE_URL}${image}`} />)}
                <div className="flex space-x-2">
                    <div className="cursor-pointer w-[1.5rem] h-[1.5rem]" onClick={pressLike}>
                        <img src={postLike ? pressedLikes : likes} alt="like" />
                    </div>
                    <div>{likesCount}</div>
                    <div className="cursor-pointer w-[1.5rem] h-[1.5rem]" onClick={handleOpenComments}>
                        <img src={commentIcon} alt="comment" />
                    </div>
                </div>
            </section>

            <CommentModal
                open={openComment}
                onClose={() => setOpenComment(false)}
                comments={comments}
                id={id}
                fetchComment={fetchComments}
            />

            <ReportModal open={openReportModal} onClose={() => setOpenReportModal(false)} />
        </>
    );
};
