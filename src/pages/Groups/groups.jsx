import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CreateGroups } from "./createGroups";


export const Groups = () => {
      const [open, setOpen] = useState(false)
    
    const dispatch = useDispatch();
    const {isLogged,user} = useSelector(state => state.authCheck);
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
                                <div className="flex gap-10">
                                    <div className="w-[70%] flex flex-col gap-4">
                                        {isLogged && (
                                            <div className="min-h-[6rem] border border-white flex flex-col">
                                                <div className="flex h-[60%] items-center justify-center gap-[2rem] ">
                                                    <div className="w-[2rem] h-[2rem] bg-white rounded-full"></div>
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
                                                    <div className="flex-1 text-center">Photo</div>
                                                    <div className="flex-1 text-center">Video</div>
                                                    <div className="flex-1 text-center">GIF</div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="min-h-[25rem] border border-white flex flex-col items-center justify-center gap-4">
                                            <div className="text-4xl">No Posts to Show</div>
                                            <div>Check out the available groups for you to join and start posting.</div>
                                        </div>
                                    </div>

                                    <div className="w-[28%] h-[30rem] border border-white flex flex-col p-[2rem] gap-[2rem]">
                                        <div className="flex items-center border-b border-white gap-2 pb-4">
                                            <div>O</div>
                                            <div>Search</div>
                                        </div>
                                        <div className="text-2xl ">My Groups</div>
                                        <div className="flex-grow"></div>
                                        <button className="border border-white px-4 py-1 hover:bg-white hover:text-black transition" onClick={() => setOpen(true)}>
                                            +Create Group
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <CreateGroups open={open} onClose={() => setOpen(false)}/>

        </>
    )
}