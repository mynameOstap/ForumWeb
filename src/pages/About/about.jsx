import { useEffect, useState } from "react"
import a from "../../assets/About/1.jpg"
import b from "../../assets/About/2.jpg"
import c from "../../assets/About/3.jpg"
import d from "../../assets/About/4.jpg"
import f from "../../assets/About/5.jpg"

export const About = () => {
    const photos = [a, b, c, d, f]
    const [curIndex, setCurIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurIndex((prev) => (prev + 1) % photos.length)
        }, 500)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <section className="relative">
                <div className="bg-black  h-[25rem] flex items-center justify-center">
                    <div className=" text-white text-6xl max-w-[30rem] text-center font-bold">
                        About Random Musings
                    </div>
                </div>
                <div className="absolute top-[25rem] left-1/2 -translate-1/2">
                    <img className="w-[10rem] h-[10rem] rounded-full " src={photos[curIndex]} />
                </div>
                <div className="bg-white min-h-[25rem] flex">
                    <div className=" text-center w-full">
                        <div className="flex flex-col max-w-3xl mx-auto  gap-6 m-[7rem]">
                            <div className="text-2xl font-bold">Our story</div>
                            <div>
                                I'm a paragraph. Click here to add your own text and edit me.
                                It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
                                Feel free to drag and drop me anywhere you like on your page.
                                I’m a great place for you to tell a story and let your users know a little more about you.
                            </div>
                            <div>
                                This is a great space to write long text about your company and your services.
                                You can use this space to go into a little more detail about your company.
                                Talk about your team and what services you provide.
                                Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors.
                                Make your company stand out and show your visitors who you are.
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}