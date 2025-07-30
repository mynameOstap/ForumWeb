import icon_find from "../../assets/Members/icon-find.png"


export const Members = () => {
    return (
        <>
            <section className="bg-black items-center h-full w-screen">
                <div className="flex flex-col items-center text-white">
                    <div className="flex flex-col lg:w-[45%] space-y-4 justify-between lg:flex-row  lg:mt-[4rem]">
                        <div className="flex gap-3">
                            <div>All Members</div>
                            <div>O</div>
                        </div>
                        <div className="flex gap-6">
                            <div>O</div>
                            <div>O</div>
                            <div className="flex gap-3  items-center  border-b border-white pb-2">
                                <img className="h-[1.5rem] w-[1.5rem]" src={icon_find} />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="  text-white"
                                />

                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-1 justify-center h-full w-full">
                    <div className="max-w-[20%] flex flex-col items-center justify-center text-white text-center gap-5 mb-[4rem]">
                        <div className="text-2xl ">Log in to see members</div>
                        <div className="text-sm ">
                            Log in to check out members profiles, make comments, follow posts & more.
                        </div>
                        <button className="border border-white px-4 py-1 hover:bg-white hover:text-black transition">
                            Log In
                        </button>
                    </div>
                </div>

            </section>
        </>
    )
}