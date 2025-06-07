import { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navlinks } from "../../utils/utils";
import { useGlobalProps } from "../GlobalPropsProvider";
import { userTypes } from "../../utils/types";
import MainButton from "../UI/MainButton";
import LogoutModal from "../../Auth/LogoutModal";

const MobileNavbar = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenuOpen,
    setSignInOpen,
    setLogoutModalIsOpen,
    user,
  } = useGlobalProps();

  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const [profOptionsOpen, setProfOptionsOpen] = useState<boolean>(false);
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollDown(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (location.pathname !== "/") return null;
  return (
    <header className={`fixed w-full flex mainPX transition2 z-50 ${
        scrollDown ? "mainDarkBg shadow-[0_0_10px_#070707]" : "bg-transparent"
      }`} >

      <nav className="flex w-full items-center justify-between h-[60px] MAX_W mx-auto">
        <NavLink to="/" className="whiteText flex items-center gap-[5px]">
          <img src="/icons/logo.png" className="w-[35px]" alt="Logo" />
          <img src="/images/mw.png" className="w-[150px] mb-[2px]" alt="MW" />
        </NavLink>

        <div className="flex items-center gap-[15px]">
          {user ? (
            <div className={`relative flex items-center gap-[8px] cursor-pointer text-[#d2d2d2] hover:text-white group
             hover:bg-mainLightDark p-2 ${profOptionsOpen? 'bg-mainLightDark rounded-t-md' : 'rounded-md'}`}
              onClick={() => setProfOptionsOpen(prev => !prev)}>
              <p className="text-[14px] font-light txtShadow">
                { user.firstName.toUpperCase()}
              </p>
                <img className="w-[28px] h-[28px] object-cover rounded-full group-hover:bg-black transition1"
                  src={user.image} alt="User"
                />

              {/* Profile DropDown */}
              {profOptionsOpen &&
              <div className="absolute w-full left-0 bottom-[-40px] flex items-center gap-3 text-white hover:text-[#da3f3f] bg-mainLightDark
                              p-2 rounded-b-md justify-between  border-t border-[#9f9f9fae]"
                onClick={() => {setLogoutModalIsOpen(true); }}>
                <p>Logout</p>
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>}
            </div>
          ) : (
            <MainButton onClick={() => setSignInOpen((prev) => !prev)} size="small">
              LOGIN
            </MainButton>
          )}

          <button id="HAMBURGER" className="flex flex-col gap-[5px] w-[30px] z-50"
            onClick={toggleMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${
                mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span className={`w-[25px] h-[3px] rounded bg-white transition1 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-40 transition1"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed top-0 right-0 h-screen w-[40%] max-w-[300px] min-w-[220px] bg-mainDark flex flex-col items-start mainPX pt-[20px] gap-[20px] z-50 shadow-2xl transitio1
             ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} >

        <div className="w-full flex items-center justify-between px-2">
           <i className="fa-solid fa-xmark text-2xl text-white cursor-pointer hover:text-[#F2C94C] hover:rotate-180 transition1"
              onClick={() => setMobileMenuOpen(false)}>
            </i>
          {user ? (
            <div className={`relative flex items-center gap-2 cursor-pointer text-[#d2d2d2] hover:text-white group hover:bg-mainLightDark p-2 ${
                profOptionsOpen ? "bg-mainLightDark rounded-t-md" : "rounded-md"  }`}
              onClick={() => setProfOptionsOpen((prev) => !prev)}
            >
              <p className="text-sm font-light txtShadow">{user.firstName.toUpperCase()}</p>
              <img className="w-7 h-7 rounded-full object-cover group-hover:bg-black transition1"
                src={user.image} alt="User"
              />

              {/* Dropdown inside aside */}
              {profOptionsOpen && (
                <div className="absolute left-0 bottom-[-40px] mt-1 w-full flex items-center justify-between gap-3 text-white hover:text-[#da3f3f] bg-mainLightDark p-2 rounded-b-md border-t border-[#9f9f9fae]"
                  onClick={() => setLogoutModalIsOpen(true)} >
                  <p>Logout</p>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
              )}
            </div>
          ) : (
            <MainButton onClick={() => setSignInOpen((prev) => !prev)} size="small" >
              LOGIN
            </MainButton>
          )}
        </div>


        {/* ----------------------------------------- LINKS ----------------------------------------- */}
        <div className="flex flex-col w-full">
          {navlinks.map((link, i) => (
            <a key={i} href={link.scrollPoint || "#"}
              onClick={() => setMobileMenuOpen(false)}
              className="font-light text-[15px] text-[#d2d2d2] w-full p-2 rounded-md
              hover:text-white hover:bg-mainLightDark"
            >
              {link.name.toUpperCase()}
            </a>
          ))}
        </div>
      </aside>
    </header>
  );
};

export default MobileNavbar;
