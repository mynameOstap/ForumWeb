import { useEffect } from "react";
import {GroupCardSelect } from "./groupCard";



export const SelectGroups = ({ open, onClose, groups,onSelect }) => {

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);



    if (!open) return null;
    return (
        <>
            <section
                className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50 "

            >
                <div
                    className="relative bg-white p-6 rounded w-[38rem] h-[40rem] flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between">
                        <div className="text-2xl font-bold">Select group</div>
                        <div className="cursor-pointer text-2xl font-bold" onClick={() => onClose()}>X</div>
                    </div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border w-[100%] px-4 py-2  text-black mt-4"
                    />

                    <div className="flex flex-col gap-1 overflow-y-auto pr-1  ">
                        {groups.map((value) => (
                            <GroupCardSelect name={value.name} key={value.id} id={value.id} onSelect={onSelect} image={value.avatarUrl}  members={value.groupMembers?.length || 0}/>
                        ))}
                    </div>


                </div>
            </section>
        </>
    );
}