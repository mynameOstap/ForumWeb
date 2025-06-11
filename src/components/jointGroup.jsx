import { useEffect,useState} from "react";
import "./jointGroup.css"
import { useSlide } from "./slideContext";


export const JointGroup = () =>{
        const {slideIndex, setSlideIndex} = useSlide();
        const [animate,setAnimate] = useState(true)
        useEffect(()=>{
            setAnimate(true)
            const timeout = setTimeout(()=>{
                setAnimate(false)
            },2700)
            return () => clearTimeout(timeout)
        },[slideIndex])
    
    return(
        <>
        <div className={`flex justify-center items-center ${animate ? "anim-slide-in" : ""}`}
        >
            <p className="text-xl">
             +Join Group
            </p>
        </div>
        </>
    )

}