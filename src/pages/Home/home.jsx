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
    const { slideIndex, setSlideIndex } = useSlide();

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % backgrounds.length);

        }, 4000);
        return () => clearInterval(interval);
    }, [slideIndex]);
    const handlerBackgroundButton = (index) => {
        if (index != slideIndex) {
            setSlideIndex(index);
        }
    }

    return (
        <>
            <section className="overflow-hidden h-screen relative">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                    {backgrounds.map((bg, index) => (
                        <div key={index} className="min-w-full h-screen">
                            {bg}
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                    {backgrounds.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => handlerBackgroundButton(index)}
                            className={`rounded-full w-2 h-2 transition-colors cursor-pointer ${index === slideIndex ? "bg-white" : "bg-gray-500"
                                }`}
                        />
                    ))}
                </div>
            </section>

            <section className="w-full bg-black">
                <div className="flex flex-col items-center justify-center p-8 gap-10 text-white text-center">
                    <h2 className="text-5xl sm:text-7xl font-bold">Join Groups</h2>
                    <p className="max-w-md text-md">
                        Explore your groups below to see what you can do, or head to Settings to start managing your Categories.
                    </p>
                    <div className="text-md underline cursor-pointer">+ Read more</div>
                </div>
            </section>

            <section className="w-full bg-black">
                <div className="flex flex-col lg:flex-row overflow-hidden cursor-pointer">
                    {[background1, background2, background3].map((imgSrc, i) => (
                        <div
                            key={i}
                            className="relative flex-1 min-h-[200px] lg:h-[500px] flex items-center justify-center group"
                        >
                            <img
                                src={imgSrc}
                                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                alt={`Slide ${i}`}
                            />
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-4xl lg:text-6xl text-white font-bold">
                                #{["ABOUT US", "SITE RULE", "CONTACT US"][i]}
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </>
    );
};
