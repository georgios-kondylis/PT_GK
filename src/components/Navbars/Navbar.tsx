import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import MainButton from "../UI/MainButton";
import { useGlobalProps } from "../GlobalPropsProvider";
import SignIn from "../../Auth/SignIn";
import { userTypes } from "../../utils/types";

const Navbar = () => {
  const { setSignInOpen, setLogoutModalIsOpen, user } = useGlobalProps();
  const [profOptionsOpen, setProfOptionsOpen] = useState(false);

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
        <header className={`fixed w-full flex justify-center mainPX transition2 z-50
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

            <div id="NavLinks" className="absolute left-1/2 -translate-x-1/2  flex items-center gap-[20px]">
              {navlinks.map((link, i) => (
                <a key={i} href={link.scrollPoint}
                  className={`transition1 font-light text-[14px] txtShadow text-[#d2d2d2] hover:text-white hover:scale-[1.05] hover:-translate-y-[1px]`}
                 >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>

           {user ? (
            <div className={`relative py-2 px-2 flex items-center gap-2 cursor-pointer text-[#d2d2d2] hover:text-white group hover:bg-mainLightDark
              ${profOptionsOpen ? "bg-mainLightDark rounded-t-md" : "rounded-md"}`}
              onClick={() => setProfOptionsOpen(prev => !prev)}
            >
              <p className="text-[14px] font-light txtShadow">{user.firstName.toUpperCase()}</p>
              <img className="w-[30px] h-[30px] object-cover rounded-full group-hover:bg-black transition1"
                src={user.image} alt="User"
              />

              {/* Profile DropDown */}
              {profOptionsOpen && (
                <div className="absolute w-full right-0 bottom-[-40px] mt-[2px] flex items-center justify-between gap-3 text-white hover:text-[#da3f3f] bg-mainLightDark p-2 rounded-b-md border-t border-[#9f9f9fae]
                 min-w-[60px]"
                  onClick={() => setLogoutModalIsOpen(true)}
                >
                  <p>Logout</p>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
              )}
            </div>
          ) : (
            <MainButton onClick={() => setSignInOpen((prev) => !prev)} size="small">
              LOGIN
            </MainButton>
          )}

          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;