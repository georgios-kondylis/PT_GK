import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import MainButton from "../UI/MainButton";
import { useGlobalProps } from "../GlobalPropsProvider";
import SignIn from "../../Auth/SignIn";
import { userTypes } from "../../utils/types";

const Navbar = () => {
  const { signInOpen, setSignInOpen, newRefresh, REFRESH } = useGlobalProps();
  const [user, setUser] = useState<userTypes | null>(null);
  const [userHovered, setUserHovered] = useState<boolean>(false);
  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: userTypes = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser)
      } catch (error) {
        console.error("Failed to parse user from sessionStorage:", error);
      }
    }
  }, [signInOpen, REFRESH]);


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

            <div id="NavLinks" className="absolute left-1/2 -translate-x-1/2  flex items-center gap-[20px]">
              {navlinks.map((link, i) => (
                <a key={i}
                  href={link.scrollPoint}
                  className={`transition1 font-light text-[14px] txtShadow text-[#d2d2d2] hover:text-white hover:scale-[1.05] hover:-translate-y-[1px]`}
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>

            {user?
             <div className="relative py-3 pl-4 flex items-center gap-2 cursor-pointer text-[#d2d2d2] hover:text-white group"
                  onMouseEnter={() => setUserHovered(true)}
                  onMouseLeave={() => setUserHovered(false)}
                  onClick={() => {
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('token');
                    setUser(null);
                    newRefresh();
                  }}>
              <p className="font-light pt-1 "> 
               {userHovered ? 'LOGOUT' : user.firstName.toLocaleUpperCase()}
              </p>
              {userHovered ? 
              <i className="text-[23px] fa-solid fa-arrow-right-from-bracket"></i>
              : 
               <img className="w-[35px] group-hover:bg-black rounded-full transition1" src={user.image} alt="" />
               }
            </div> 
            :
            <MainButton onClick={() => setSignInOpen(prev => !prev)} size="medium">
              LOGIN
            </MainButton>
             }
             
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;