import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { PostCardGroup } from "./postCardGroup";
import { WriteMessageGroup } from "./writeMessageGroup";
import unknowImgWhite from "../../assets/Group/unknowImgWhite.png";
import { FullPageSpinner } from "../../components/Loader/FullPageSpinner";
import threeDots from '../../assets/Group/threeDots.png';
import { ThreeDotsModal } from "./modalThreeDots";
import { GroupSettings } from "./groupSettings";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css"

const TABS = ["Discussion", "Media", "Files", "Members", "About"];

export const GroupPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("Discussion");
  const [posts, setPosts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({ groupId: "", groupName: "" });
  const [openWriteMessage, setOpenWriteMessage] = useState(false);
  const [underline, setUnderline] = useState(null);
  const [membership, setMembership] = useState(null);
  const [threeDotsOpen, setThreeDotsOpen] = useState(false);
  const [groupSettingsOpen, setGroupSettingsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const underlineRef = useRef(false);

  const tabRefs = useRef({});
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector(state => state.authCheck);




  const recalc = () => {
    const cur = tabRefs.current[activeTab];
    if (cur) {
      setUnderline({
        transform: `translateX(${cur.offsetLeft}px)`,
        width: cur.offsetWidth,
      });
    }
  };

  const joinGroup = async () => {
    try {
      const joinRes = await axiosInstance.post(`/group/${groupId}/join`);
      if (joinRes.status == 200) {
        await fetchData();
      }

    }
    catch (e) {
      console.error(e)
    }
  }

  const LeaveGroup = async () => {
    try {
      const joinRes = await axiosInstance.post(`/group/${groupId}/leave`);
      if (joinRes.status == 200) {
        setMembership(null)
        await fetchData();
      }

    }
    catch (e) {
      console.error(e)
    }
  }

  useLayoutEffect(() => {
    recalc();
    underlineRef.current = true;
  }, [activeTab]);

  useEffect(() => {
    if (group) {
      const timeout = setTimeout(() => {
        recalc();
        underlineRef.current = true;
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [group]);

  const fetchData = async () => {
    try {
      const groupsRes = await axiosInstance.get(`/group/${groupId}`);
      setGroup(groupsRes.data);
      setSelectedGroup({ groupId: groupsRes.data.id, groupName: groupsRes.data.name });

      const postsRes = await axiosInstance.get(`/group-post/${groupId}`);
      setPosts(postsRes.data);

      const membershipRes = await axiosInstance.get(`/group/${groupId}/membership`);
      setMembership(membershipRes.data);
      console.log(membershipRes.data)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();

  }, [groupId]);

  const refreshPosts = async () => {
    try {
      const postsRes = await axiosInstance.get(`/group-post/${groupId}`);
      setPosts(postsRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (!group) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <FullPageSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-black min-h-screen p-4 text-white flex flex-col items-center ">
        <section className="flex flex-col items-center w-full lg:max-w-[60%] mb-8">
          <img
            src={group?.avatarUrl ? `${API_BASE_URL}${group.avatarUrl}` : unknowImgWhite}
            alt={group.name}
            className="h-[15rem] w-full object-cover rounded"
          />
          <div className="flex w-full mt-4 justify-between">
            <div>
              <h1 className="text-lg font-semibold">{group.name}</h1>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{group.privacy || "Public"}</span>
                <span>Members: {group.groupMembers?.length ?? 0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="border-r pr-4">O</div>
              {membership ? (<button className="border border-white px-4 py-1 hover:bg-white hover:text-black cursor-pointer"
                onClick={() => { LeaveGroup() }}
              >
                Leave
              </button>) : (
                <button className="border border-white px-4 py-1 hover:bg-white hover:text-black cursor-pointer"
                  onClick={() => joinGroup()}
                >
                  Join
                </button>)}

              <div>O</div>
              <div className="relative">
                <img src={threeDots} className="cursor-pointer" onClick={() => setThreeDotsOpen(prev => !prev)} alt="" />
                <ThreeDotsModal open={threeDotsOpen} role={membership?.membership?.role} onClose={() => setThreeDotsOpen(false)}
                  onGroupSettingClick={() => { setThreeDotsOpen(false); setGroupSettingsOpen(true) }} />
              </div>

            </div>
          </div>
          <div className="flex border-t border-b w-full border-gray-500 overflow-x-auto space-x-2 lg:space-x-6 p-2 cursor-pointer relative ">
            {TABS.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                ref={(node) => (tabRefs.current[tab] = node)}
                className="text-xs font-semibold sm:font-normal sm:text-base md:text-lg  "
              >
                {tab}
              </div>
            ))}
            {underline && (
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-white ${underlineRef.current ? "transition-all duration-300 ease-in-out" : ""
                  }`}
                style={{
                  transform: underline.transform,
                  width: underline.width,
                }}
              />
            )}


          </div>

        </section>

        {activeTab === "Discussion" && (
          <div className="flex w-full lg:max-w-[60%] gap-8">
            <div className="flex-1 flex flex-col">
              <div className="border border-white divide-y divide-white mb-6 ">
                <div
                  className="flex justify-center items-center gap-4 p-4 hover:bg-gray-950 cursor-pointer"
                  onClick={() => setOpenWriteMessage(true)}
                >
                  <img src={user?.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : unknowImgWhite} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full" />
                  <input
                    type="text"
                    placeholder="Share something..."
                    className="border-[0.5px] border-whit w-[40%] md:w-[50%] lg:w-[60%] px-4 md:py-2  text-white"
                    readOnly
                  />
                  <button className="border border-white p-2 sm:px-2 md:px-4 py-1 hover:bg-white hover:text-black transition text-xs sm:text-sm md:text-base lg:text-lg ">
                    Create Post
                  </button>
                </div>
                <div className="flex text-center text-sm divide-x divide-white p-2">
                  {["Photo", "Video", "GIF"].map((label) => (
                    <span
                      key={label}
                      className="flex-1 text-center cursor-pointer hover:underline text-xs sm:text-sm md:text-base lg:text-lg "
                      onClick={() => setOpenWriteMessage(true)}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {posts.length === 0 ? (
                  <div className="text-center text-gray-400">No posts yet in this group</div>
                ) : (
                  posts.map((post) => (
                    <PostCardGroup
                      key={post.id}
                      id={post.id}
                      createdAt={post.createdAt}
                      title={post.title}
                      content={post.content}
                      groupName={group.name}
                      author={post.userName}
                      like={post.like.length}
                      isLikedByUser={post.isLikedByUser}
                      image={post.imageUrl}
                      comment={post.comment}
                      authorId={post.userId}
                    />
                  ))
                )}
              </div>
            </div>

            <div className=" hidden lg:flex flex-col space-y-4 w-64">
              <div className="flex flex-col space-y-4 border border-white p-4 rounded-md">
                <h1>About</h1>
                <p>{group.description || "About group empty."}</p>
              </div>
              <div className="border border-white p-4 rounded-md">
                <h1>Members</h1>
                <p>{group.members || "Members empty."}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Media" && (
          <div className="text-4xl font-bold">SOOOOOOOOOOON..............</div>
        )}
      </div>

      <WriteMessageGroup
        open={openWriteMessage}
        onClose={() => setOpenWriteMessage(false)}
        selectedGroup={selectedGroup}
        fetchPost={refreshPosts}
      />
      <GroupSettings open={groupSettingsOpen} avatarUrl={`${API_BASE_URL}${group.avatarUrl}`} group={group} fetchData={fetchData} onClose={() => setGroupSettingsOpen(false)} />
    </>
  );
};
