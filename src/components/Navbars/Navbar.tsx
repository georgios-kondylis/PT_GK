import { NavLink } from "react-router-dom";
import { navlinks } from "../../utils";

const Navbar = () => (
  <header className="absolute bg-transparent w-full flex justify-center mainPX">
    <nav className="flex items-center justify-between h-[80px] w-full MAX_W">
     
      <NavLink to="/" className="whiteText">
        LOGO
      </NavLink>

      {/* Links */}
      <div className="flex items-center gap20px">
        {navlinks.map((link, i) => (
          <NavLink key={i} to={link.path} className={({ isActive }) => `transition1 font-light text-[14px] txtShadow
            ${isActive
                ? "text-[white] scale-[1.1] translate-y-[-1px]"
                : "text-[#d2d2d2] hover:text-[#ffffff]"
            }`}>
            {link.name.toLocaleUpperCase()}
          </NavLink>
        ))}
      </div>

      <button className="whiteText">
        Sign In
      </button>
    </nav>
  </header>
);

export default Navbar;
