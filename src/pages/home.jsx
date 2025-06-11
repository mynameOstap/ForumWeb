
import { useEffect, useState } from "react";
import { BackgroundPurple } from "../components/backgrondHomePurple";
import { BackgroundBlue } from "../components/backgroundHomeBlue";



export const Home = () => {
    const [slideIndex,setSlideIndex] = useState(0);
    const backgrounds = [<BackgroundPurple/>,<BackgroundBlue/>]
    useEffect(()=>{
        const interval = setInterval(()=>{
        setSlideIndex((prev) => (prev + 1)%backgrounds.length)
    },4000);
    return () => clearInterval(interval);
    },[])
    
    return(
        <>
    <section className=" overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out  "
        style={{transform:`translateX(-${slideIndex * 100}%)`}}>
            {backgrounds.map((bg,index)=>(
                <div key={index} className="w-full h-screen">
                    {bg}
                </div>
            ))}

        </div>

       
        
    
    </section>
        
    </>
    );
    
}