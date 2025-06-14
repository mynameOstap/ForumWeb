import { useEffect, useState } from "react";
import { BackgroundPurple } from "../../components/Home/backgroundHomePurple";
import { BackgroundBlue } from "../../components/Home/backgroundHomeBlue";
import { useSlide } from "../../components/Home/slideContext";
import background1 from "../../assets/1.jpeg"
import background2 from "../../assets/2.jpeg"
import background3 from "../../assets/3.jpeg"
export const Home = () => {
    const backgrounds = [
        <BackgroundPurple />,
        <BackgroundBlue />
    ];
    const {slideIndex, setSlideIndex} = useSlide();

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % backgrounds.length);
            
        }, 4000);
        return () => clearInterval(interval);
    }, [slideIndex]);
    const handlerBackgroundButton = (index) => {
        if(index != slideIndex)
        {
            setSlideIndex(index);
        }
    }

    return (
        <>
            <section className="overflow-hidden h-screen ">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                    {backgrounds.map((bg, index) => (
                        <div key={index}  className="w-full h-screen flex-shrink-0">
                            {bg}
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex  gap-3">
                    {backgrounds.map((_, index) => (
                        <div
                            key={index}
                            onClick={()=>handlerBackgroundButton(index)}
                            className={`rounded-full w-2 h-2 transition-colors cursor-pointer ${
                                index === slideIndex ? "bg-white" : "bg-gray-500"
                            }`}
                        />
                    ))}
                </div>
            </section>
            <section className="w-full bg-black">
                    <div className="flex flex-col items-center justify-center p-30 gap-10 text-white text-center">
                        <div className="text-8xl font-bold">Join Groups</div>
                        <div className="max-w-[32rem] text-md  ">Explore your groups below to see what you can do, or head to Settings to start managing your Categories. </div>
                        <div className="text-md">+Read more</div>
                    </div>
            </section>
            <section className="w-full bg-black">
                <div className="flex object-cover h-[40rem] overflow-hidden cursor-pointer">
                   <div className="flex items-center justify-center group">
                    <img src={background1} className="object-cover transition-opacity duration-600 group-hover:opacity-0"  alt="" />
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-600 text-6xl text-white">#ABOUT US</div>

                    </div>
                   <div className="flex items-center justify-center group">
                    <img src={background2} className="object-cover transition-opacity duration-600 group-hover:opacity-0" alt="" />
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-600  text-6xl text-white">#SITE RULE</div>
                    </div>
                   <div className="flex items-center justify-center group">
                    <img src={background3} className="object-cover transition-opacity duration-600 group-hover:opacity-0" alt="" />
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-600 text-6xl text-white ">#CONTACT US</div>

                    </div>
                </div>
            </section>
        </>
    );
};
