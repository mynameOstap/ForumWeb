


export const Contact = () => {
    return (
        <>
            <section className="bg-black h-full flex justify-center items-center ">
                <div className="w-[70%] flex text-white ">
                    <div className="flex flex-col gap-12 justify-center items-center w-[50%]">
                        <div className="text-6xl font-bold w-[40%]">Have something to say? Contact us!</div>
                        <div>+ 123-456-7890   I    info@mysite.com</div>
                    </div>
                    <div className="flex flex-col w-[50%] justify-center items-center">
                        <div className="text-2xl font-semibold mb-6">Send Us a Message</div>
                        <div className="w-full flex flex-col gap-4 items-center relative h-[38%]">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border w-[60%] px-4 py-2  text-white"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                className="border w-[60%] px-4 py-2  text-white"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="border w-[60%] px-4 py-2  text-white"
                            />
                            <div className="w-[60%] flex flex-col items-center justify-center">
                            <textarea
                                placeholder="Type your message here..."
                                rows={4}
                                className="border  w-[100%] px-4 py-2  text-white "
                            />
                          
                            <div className="flex items-center justify-center border p-2 px-8 w-[30%] absolute bottom-[-11rem] cursor-pointer bg-black  hover:text-gray-300 hover:border-gray-400 ">
                                Submit
                            </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}