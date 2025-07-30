import unknowImg from "../../assets/Group/unknowImg.png"
import unknowImgWhite from "../../assets/Group/unknowImgWhite.png"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GroupCard = ({ name, img, members, typeGroup, group }) => {

  return (
    <section className="flex items-center w-full max-w-full hover:bg-gray-950 text-black py-4 cursor-pointer px-4 transition">
      <img
        src={group?.avatarUrl ? `${API_BASE_URL}${group.avatarUrl}` : unknowImgWhite}
        alt={name}
        className="rounded-full object-cover w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
      />
      <div className="flex flex-col ml-2 sm:ml-4 w-full min-w-0">
        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white break-words max-w-full overflow-hidden">
          {name}
        </h1>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 flex flex-col sm:flex-row sm:gap-2">
          <span>{typeGroup || "Public"}</span>
          <span>Members: {members}</span>
        </div>
      </div>
    </section>
  );
};

export const GroupCardSelect = ({ id, name, img, members, typeGroup, onSelect, image }) => {
  return (
    <section className="flex items-center justify-between w-full hover:bg-gray-50 text-black py-4 cursor-pointer px-4 transition">
      <div className="flex items-center">
        <img
          src={image ? `${API_BASE_URL}${image}` : unknowImg}
          alt={name}
          className="rounded-full object-cover w-[4rem] h-[4rem]"
        />
        <div className="flex flex-col ml-4">
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="flex gap-2 text-sm text-gray-600">
            <h1>{typeGroup || "Public"}</h1>
            <h1>Members: {members}</h1>
          </div>
        </div></div>

      <button className="border border-black px-4 py-1 text-black hover:bg-black  hover:text-white transition h-[2rem]"
        onClick={() => onSelect(id, name)}
      >
        Select
      </button>

    </section>

  );
};