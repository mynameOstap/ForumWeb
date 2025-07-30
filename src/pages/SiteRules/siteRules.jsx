import { useEffect, useState } from "react"
import a from "../../assets/SiteRules/1.jpg"
import b from "../../assets/SiteRules/2.jpg"
import c from "../../assets/SiteRules/3.jpg"
import d from "../../assets/SiteRules/4.jpg"
import "../../components/Home/jointGroup.css"



export const SiteRules = () => {
    const photos = [a, b, c, d]
    const [curIndex, setCurIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurIndex((prev) => (prev + 1) % photos.length)
        }, 700)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <section className="bg-black">
                <div className="flex flex-col justify-end items-center text-white text-center gap-8 min-h-[16rem] pb-4">
                    <div className="text-6xl font-bold">Site Rules</div>
                    <div className="text-center max-w-[28rem]">Explore your forum below to see what you can do, or head to Settings to start managing your Categories. </div>
                </div>
                <div className="flex justify-center items-center h-[40rem]">
                    <div className="w-[85%] h-[30rem] bg-cover flex justify-center items-center	"
                        style={{ backgroundImage: `url(${photos[curIndex]}` }}>

                        <div className="bg-black h-[90%] w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white content-evenly">
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">01</div>
                                <div className="w-[70%] anim-slide-in">No offensive content</div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">02</div>
                                <div className="w-[70%] anim-slide-in">No Trolling</div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">03</div>
                                <div className="w-[70%] anim-slide-in">No spreading of any copyrighted material</div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">04</div>
                                <div className="w-[70%] anim-slide-in">No spamming</div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">05</div>
                                <div className="w-[70%] anim-slide-in">No advertising</div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="w-[30%] text-3xl md:text-6xl font-bold text-right pr-4">06</div>
                                <div className="w-[70%] anim-slide-in">Please be nice</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}