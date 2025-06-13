import { JointGroup } from "./jointGroup";


export const BackgroundBlue = () => 
{
    
    return(
        
         <div className={`w-screen h-screen bg-blue-600 flex flex-col gap-8 items-center justify-center `}>
            <div className="  text-2xl">Question the Unquestionable</div>
            <JointGroup/>

        </div>
        
        
    );
}