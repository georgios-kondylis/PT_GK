import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import MainButton from "../UI/MainButton";
import { useGlobalProps } from "../GlobalPropsProvider";
import SignIn from "../../Auth/SignIn";

const Navbar = () => {
  const { signInOpen, setSignInOpen } = useGlobalProps();

  const location = useLocation();
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollDown(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {location.pathname === "/" && (
        <header
          className={`fixed w-full flex justify-center mainPX transition2 z-50
          ${ scrollDown
              ? "mainDarkBg shadow-[0_0_10px_#070707]"
              : "bg-transparent"
          }`}
        >
          <nav className="flex items-center justify-between h-[70px] w-full MAX_W">
            <NavLink to="/" className="whiteText flex items-center gap-[2px]">
              <img src="/icons/logo.png" className="w-[50px]" alt="" />
              <img className="w-[250px] mb-[3px]" src="/images/mw.png" alt="" />
            </NavLink>

            <div className="absolute left-1/2 -translate-x-1/2  flex items-center gap-[20px]">
              {navlinks.map((link, i) => (
                <a key={i}
                  href={link.scrollPoint}
                  className={`transition1 font-light text-[14px] txtShadow text-[#d2d2d2] hover:text-white hover:scale-[1.05] hover:-translate-y-[1px]`}
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>

            <MainButton onClick={() => setSignInOpen(prev => !prev)} size="medium">
              LOGIN
            </MainButton>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;

{
  /* Links */
}
{
  /* <div className="flex items-center gap20px">
        {navlinks.map((link, i) => (
          <NavLink key={i} to={link.path} className={({ isActive }) => `transition1 font-light text-[14px] txtShadow
            ${isActive
                ? "text-[white] scale-[1.1] translate-y-[-1px]"
                : "text-[#d2d2d2] hover:text-[#ffffff]"
            }`}>
            {link.name.toLocaleUpperCase()}
          </NavLink>
        ))}
      </div> */
}
{
  /* Links */
}
