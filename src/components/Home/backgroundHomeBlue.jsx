import { JointGroup } from "./jointGroup";


export const BackgroundBlue = () => 
{
    
    return(
        
         <div className={`w-screen h-screen bg-blue-600 flex flex-col gap-8 items-center justify-center `}>
            <div className=" text-white  font-mono text-4xl font-bold">Question the Unquestionable</div>
            <JointGroup/>

        </div>
        
        
    );
}