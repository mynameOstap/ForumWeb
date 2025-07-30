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
    fetchPost,
    comment
}) => {
    const [postLike, setPostLike] = useState(isLikedByUser);
    const [likesCount, setLikesCount] = useState(like);
    const [comments, setComments] = useState(comment);
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
            <section className="flex flex-col gap-4  w-full bg-black text-white px-4 py-4 sm:px-6 sm:py-6 border border-white ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 ">
                        <img
                            src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : unknowImg}
                            alt={author || "unknown"}
                            className="rounded-full object-cover w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
                        />
                        <div className="flex flex-col text-sm max-w-[60vw] break-words break-all">
                            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg ">{author || "Unknown"}</span>
                            <span className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg ">
                                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })} in {groupName}
                            </span>
                        </div>
                    </div>
                    <div className="relative ">
                        <img
                            src={threeDots}
                            alt=""
                            onClick={() => setOpenThreeDots(prev => !prev)}
                            className="cursor-pointer w-5 h-5"
                        />
                        <ThreeDotsModalPost open={openThreeDots}
                            onClose={() => setOpenThreeDots(false)}
                            authorId={authorId}
                            postId={id}
                            fetchPost={fetchPost}
                            openReport={() => setOpenReportModal(true)} />
                    </div>
                </div>

                <div className="mt-2">
                    <h1 className="text-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg ">{title}</h1>
                    <p className="text-base mt-1 text-gray-300 break-words break-all whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg">{content}</p>
                </div>

                {image && (
                    <img
                        src={`${API_BASE_URL}${image}`}
                        className="w-full max-h-[400px] object-cover rounded-md"
                    />
                )}

                <div className="flex items-center gap-2 mt-2">
                    <div className="cursor-pointer w-6 h-6" onClick={pressLike}>
                        <img src={postLike ? pressedLikes : likes} alt="like" />
                    </div>
                    <div>{likesCount}</div>
                    <div className="cursor-pointer w-6 h-6" onClick={handleOpenComments}>
                        <img src={commentIcon} alt="comment" />
                    </div>
                    <div className="w-6 h-6">
                    {comment ? (comment?.length) : (0)}
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
