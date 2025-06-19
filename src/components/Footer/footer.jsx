import fb from "../../assets/fb.svg"
import inst from "../../assets/inst.svg"
import x from "../../assets/x.svg"

export const Footer = () => {
    return(
        <>
        <footer className="w-full bg-black p-[2%] ">
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex gap-6">
                    <img src={fb} alt="" />
                    <img src={x} alt="" />
                    <img src={inst} alt="" />
                </div>
                <div className="text-white text-md">© 2035 by Random Musings. Powered and secured by BOBER</div>
            </div>
        </footer>
        </>
    )
}