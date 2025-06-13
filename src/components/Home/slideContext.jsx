import { createContext, useContext, useState } from "react";


const SlideContext = createContext()

export const SlideProvider = ({children}) =>
{
    const [slideIndex,setSlideIndex] = useState(0)
    return(
        <SlideContext.Provider value={{slideIndex,setSlideIndex}}>
            {children}
        </SlideContext.Provider>
    )
}

export const useSlide = () => useContext(SlideContext)