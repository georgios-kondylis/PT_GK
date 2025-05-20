import { NavLink } from "react-router-dom";
import { navlinks } from "../../utils";
import { useGlobalProps } from "../GlobalPropsProvider";

const MobileNavbar = () => {
  const { mobileMenuOpen, setMobileMenuOpen, toggleMobileMenuOpen } = useGlobalProps();

  return (
    <header className="mainDarkBg w-full fixed top-0 left-0 z-50 mainPX">
      <nav className="flex items-center justify-between h-[60px] MAX_W mx-auto">
        <NavLink to="/" className="whiteText text-xl font-semibold">
          MySite
        </NavLink>

        <div className="flex items-center gap20px">
          <button className="whiteText text-sm">
            Sign In
          </button>

          <button
            className="flex flex-col gap-[5px] w-[30px] z-50"
            onClick={toggleMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Dimmed overlay when menu is open */}
      {mobileMenuOpen && (<div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40 transition1" onClick={() => setMobileMenuOpen(false)}/> )}

      <aside className={`fixed top-0 right-0 h-screen w-[70%] max-w-[300px] min-w-[220px] mainDarkBg whiteText flex flex-col items-start mainPX pt-[20px] gap-[20px] z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} >

        {/* Close Icon */}
        <div className="w-full flex justify-end pr-[10px]">
          <i className="fa-solid fa-xmark text-2xl cursor-pointer hover:text-[#F2C94C] transition1"
            onClick={() => setMobileMenuOpen(false)}>
          </i>
        </div>

        {/* Navigation Links */}
        {navlinks.map((link, i) => (
          <NavLink key={i} to={link.path} onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>`transition1 font-light
            ${isActive ? "text-[#F2C94C]" : "whiteText hover:text-[#d3d3d3]"}`} 
          >
            {link.name}
          </NavLink>
        ))}
      </aside>
    </header>
  );
};

export default MobileNavbar;
