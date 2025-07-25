import { Spinner } from "./Spinner"



export const FullPageSpinner = () =>
{
    return(
        <div className=" flex justify-center items-center insert-0 bg-black/30">
            <Spinner size={32}/>
        </div>
    )
}