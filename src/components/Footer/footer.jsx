import fb from "../../assets/fb.svg";
import inst from "../../assets/inst.svg";
import x from "../../assets/x.svg";

export const Footer = () => {
  return (
    <footer className="w-full bg-black px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex  gap-4 sm:gap-6 text-white items-center">
          <img src={fb} alt="Facebook" className="w-6 h-6" />
          <img src={x} alt="X" className="w-6 h-6" />
          <img src={inst} alt="Instagram" className="w-6 h-6" />
          <a
            href="https://github.com/mynameOstap/ForumWeb.git"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GetWeb
          </a>
          <a
            href="https://github.com/mynameOstap/ForumBack.git"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitBack
          </a>
        </div>
        <div className="text-white text-sm text-center">
          © 2035 by Random Musings. Powered and secured by BOBER
        </div>
      </div>
    </footer>
  );
};
