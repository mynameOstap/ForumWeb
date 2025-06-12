import logo from "../assets/userIcon.svg"

export const Header = () => {
  return (
    <header className="sticky top-0  z-50 bg-black w-full min-h-24">
      <div className="p-8 text-white">
        <div className="flex justify-center mt-6 gap-[10%]">
          <h1 className="text-2xl">Random Musing.</h1>

          <nav className="flex gap-12 items-center ">
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-70">Home</a>
              <a href="#" className="hover:opacity-70">Groups</a>
              <a href="#" className="hover:opacity-70">About</a>
              <a href="#" className="hover:opacity-70">Site Rules</a>
              <a href="#" className="hover:opacity-70">Contact</a>
              <a href="#" className="hover:opacity-70">Members</a>
            </div>
            <div className="flex gap-2 items-center">
              <img src={logo} alt="user icon" className="size-6" />
              <a href="#" className="hover:opacity-70">Log In</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
