

export const Groups = () => {
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
                                <div className="flex gap-10 ">
                                    <div className="w-[70%] min-h-[25rem] border-1 border-white flex flex-col items-center justify-center gap-4">

                                        <div className="text-4xl"> No Posts to Show</div>
                                        <div>Check out the available groups for you to join and start posting.</div>
                                    </div>
                                    <div className="w-[28%] h-[30rem] border-1 border-white flex flex-col">
                                        fff
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}