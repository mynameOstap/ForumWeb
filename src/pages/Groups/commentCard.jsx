import { formatDistanceToNow } from "date-fns";
import unknowImg from "../../assets/Group/unknowImg.png";
import { useDispatch, useSelector } from "react-redux";

export const CommentCard = ({ id, createdAt, content, author }) => {
    const dispatch = useDispatch();
  const { isLogged, user } = useSelector(state => state.authCheck);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    return (
        <section className="flex gap-4 border border-white rounded-lg p-4 bg-black text-white transition">
            <img
                src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : unknowImg}
                alt={author?.name || "unknown"}
                className="rounded-full object-cover w-12 h-12"
            />
            <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">{author || "Unknown"}</span>
                    <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                    </span>
                </div>
                <p className="mt-2 text-gray-300 break-words">{content}</p>
            </div>
        </section>
    );
};
