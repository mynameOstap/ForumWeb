import { useEffect, useState } from "react";
import { BackgroundPurple } from "../components/backgrondHomePurple";
import { BackgroundBlue } from "../components/backgroundHomeBlue";
import { useSlide } from "../components/slideContext";

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
        <section className="overflow-hidden h-screen relative">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                {backgrounds.map((bg, index) => (
                    <div key={index}  className="w-full h-screen flex-shrink-0">
                        {bg}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 flex gap-4 z-10">
                {backgrounds.map((_, index) => (
                    <div
                        key={index}
                        onClick={()=>handlerBackgroundButton(index)}
                        className={`rounded-full w-4 h-4 transition-colors cursor-pointer ${
                            index === slideIndex ? "bg-white" : "bg-gray-500"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
