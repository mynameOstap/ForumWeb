import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CreateGroups } from "./createGroups";
import axiosInstance from "../../api/axiosInstance";
import { GroupCard } from "./groupCard";
import { SelectGroups } from "./selectGroups";
import { WriteMessageGroup } from "./writeMessageGroup";
import { PostCardGroup } from "./postCardGroup";
import { Link } from "react-router-dom";
import { FullPageSpinner } from "../../components/Loader/FullPageSpinner";
import userIcon from "../../assets/userIcon.png"

export const Groups = () => {
    const [posts, setPosts] = useState([]);
    const [myGroup, setMyGroup] = useState([])
    const [suggestionGroup, setSuggestionGroup] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [openCreateGroups, setOpenCreateGroups] = useState(false)
    const [openSelectGroups, setSelectGroups] = useState(false)
    const [openWriteMessage, setOpenWriteMessage] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState({ groupId: "", groupName: "" });
    const [activeTabGroup, setActiveTabGroup] = useState("Suggested groups")
    const [underline, setUnderline] = useState(null);
    const [searchInput,setSearchInput] = useState("")
    const tabRef = useRef({});
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const recal = () => {
        const cur = tabRef.current[activeTabGroup]
        if (cur) {
            setUnderline({
                transform: `translateX(${cur.offsetLeft}px)`,
                width: cur.offsetWidth,
            });
        }

    }

    const handleOpenWriteMessage = (groupId, groupName) => {
        setSelectedGroup({ groupId, groupName });
        setSelectGroups(false);
        setOpenWriteMessage(true);
    };
    const dispatch = useDispatch();
    const { isLogged, user } = useSelector(state => state.authCheck);

    const fetchPost = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get("/feed")
            setPosts(res.data || [])
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }

    }
    const fetchGroups = async () => {
        try {
            const resSuggestionGroup = await axiosInstance.get("suggestion-groups")
            setSuggestionGroup(resSuggestionGroup.data || [])
            const resMyGroup = await axiosInstance.get("/my-groups");
            setMyGroup(resMyGroup.data || []);
        } catch (error) {
            console.error("Failed to fetch groups:", error);
        }
    };
    useEffect(() => {
        fetchGroups();
        fetchPost();
    }, [isLogged]);

    useEffect(() => {
        recal();
    }, [activeTabGroup]);
    return (
        <>
            <section className="bg-black w-full  text-white">
                <div className="flex flex-col  pt-[10%] gap-16 ">

                    <div className="flex flex-col items-center gap-8 text-center">
                        <div className="text-6xl font-bold">Groups</div>
                        <div className="max-w-[26rem]">
                            Welcome to the group! You can connect with other members, get updates and share videos.
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <div className="w-[60%]">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-2">
                                    <div className="text-2xl font-semibold ">Groups Feed</div>
                                    <div>View groups and posts below.</div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-10">
                                    <div className="w-full lg:w-2/3 flex flex-col gap-4 order-2 lg:order-1">
                                        {isLogged && (
                                            <div className=" border border-white flex flex-col">
                                                <div className=" flex w-full max-w-screen-lg px-4 items-center justify-center gap-[2rem] p-8 hover:bg-gray-950 cursor-pointer transition-colors duration-200 ease-in-out"
                                                    onClick={() => setSelectGroups(true)}
                                                >
                                                    <img src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : userIcon} className="w-[2rem] h-[2rem] rounded-full" />
                                                    <input
                                                        type="text"
                                                        placeholder="Share something...."
                                                        className="border-[0.5px] border-whit w-[60%] px-4 py-2  text-white"
                                                    />
                                                    <button className="border border-white px-4 py-1 hover:bg-white hover:text-black transition">
                                                        Create Post
                                                    </button>
                                                </div>
                                                <div className="flex h-[40%] border-t items-center divide-x divide-white">
                                                    <div className="flex-1 text-center cursor-pointer hover:underline" onClick={() => setSelectGroups(true)} >Photo</div>
                                                    <div className="flex-1 text-center cursor-pointer hover:underline" onClick={() => setSelectGroups(true)}>Video</div>
                                                    <div className="flex-1 text-center cursor-pointer hover:underline" onClick={() => setSelectGroups(true)}>GIF</div>
                                                </div>
                                            </div>

                                        )}
                                        {isLogged ? (
                                            posts.length === 0 ? (
                                                <div className=" border border-white flex flex-col items-center justify-center gap-4">
                                                    <div className="text-4xl">No Posts to Show</div>
                                                    <div>Check out the available groups for you to join and start posting.</div>
                                                </div>
                                            ) : (isLoading ? (<FullPageSpinner />) : (<div className="flex flex-col gap-4">
                                                {posts.map((post) => (
                                                    <PostCardGroup
                                                        key={post.id}
                                                        id={post.id}
                                                        createdAt={post.createdAt}
                                                        title={post.title}
                                                        content={post.content}
                                                        groupName={post.groupName}
                                                        author={post.userName}
                                                        like={post.like.length}
                                                        isLikedByUser={post.isLikedByUser}
                                                        image={post.imageUrl}
                                                        authorId={post.userId}
                                                        fetchPost={fetchPost}
                                                    />
                                                ))}
                                            </div>)

                                            )
                                        ) : (
                                            <div className=" border border-white flex flex-col items-center justify-center gap-4">
                                                <div className="text-4xl">No Posts to Show</div>
                                                <div>Check out the available groups for you to join and start posting.</div>
                                            </div>
                                        )}


                                    </div>

                                    <div className="w-full lg:w-1/3 border border-white flex flex-col p-4 gap-6 max-h-[30rem] lg:h-auto order-1 lg:order-2">
                                        <div className="flex items-center border border-white rounded px-3 py-2 gap-2">
                                            <div className="text-white">🔍</div>
                                            <input
                                                type="text"
                                                placeholder="Search groups..."
                                                className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                                                onChange={(e)=> setSearchInput(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-between relative">
                                            <div
                                                ref={(el) => (tabRef.current["Suggested groups"] = el)}
                                                className={`text-lg cursor-pointer ${activeTabGroup === "Suggested groups" ? "font-bold" : ""
                                                    }`}
                                                onClick={() => setActiveTabGroup("Suggested groups")}
                                            >
                                                Suggested groups
                                            </div>
                                            <div
                                                ref={(el) => (tabRef.current["My Groups"] = el)}
                                                className={`text-lg cursor-pointer ${activeTabGroup === "My Groups" ? "font-bold" : ""
                                                    }`}
                                                onClick={() => setActiveTabGroup("My Groups")}
                                            >
                                                My Groups
                                            </div>


                                            <div
                                                className="absolute bottom-0 h-[2px] bg-white transition-all duration-300"
                                                style={{
                                                    width: underline ? underline.width : 0,
                                                    transform: underline ? underline.transform : "none",
                                                }}
                                            />
                                        </div>
                                        {activeTabGroup === "Suggested groups" ? (
                                            isLogged ? (
                                                isLoading ? (
                                                    <FullPageSpinner />
                                                ) : suggestionGroup.length === 0 ? (
                                                    <div>You don't have any group</div>
                                                ) : (
                                                    <>
                                                        <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden max-h-[20rem] pr-1">
                                                            {suggestionGroup.filter(group => group.name.toLowerCase().includes(searchInput.toLowerCase())).map((value) => (
                                                                <Link to={`/groups/${value.id}`} key={value.id}>
                                                                    <GroupCard name={value.name} group={value} members={value.GroupMembers?.length || 0} />
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <button
                                                            className="border border-white px-4 py-1 hover:bg-white hover:text-black transition"
                                                            onClick={() => setOpenCreateGroups(true)}
                                                        >
                                                            +Create Group
                                                        </button>
                                                    </>
                                                )
                                            ) : (
                                                <div>Please login</div>
                                            )
                                        ) : isLogged ? (
                                            isLoading ? (
                                                <FullPageSpinner />
                                            ) : myGroup.length === 0 ? (
                                                <div>You don't have any group</div>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden max-h-[20rem] pr-1">
                                                        {myGroup.filter(group => group.name.toLowerCase().includes(searchInput.toLowerCase())).map((value) => (
                                                            <Link to={`/groups/${value.id}`} key={value.id}>
                                                                <GroupCard name={value.name} group={value} members={value.groupMembers?.length || 0} />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                    <button
                                                        className="border border-white px-4 py-1 hover:bg-white hover:text-black transition"
                                                        onClick={() => setOpenCreateGroups(true)}
                                                    >
                                                        +Create Group
                                                    </button>
                                                </>
                                            )
                                        ) : (
                                            <div>Please login</div>
                                        )}



                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <CreateGroups open={openCreateGroups} onClose={() => setOpenCreateGroups(false)} getGroups={fetchGroups} />
            <SelectGroups open={openSelectGroups} onClose={() => setSelectGroups(false)} groups={myGroup} onSelect={handleOpenWriteMessage} />
            <WriteMessageGroup open={openWriteMessage} onClose={() => setOpenWriteMessage(false)} selectedGroup={selectedGroup} fetchPost={fetchPost} />


        </>
    )
}