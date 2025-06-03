import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { maxSM, maxMD, maxLG } from "./utils/reusableFuntions";
import { useGlobalProps } from "./components/GlobalPropsProvider";
import Chat from "./components/AI/Chat";
import { TestHeadless, Programs, ProgramDetails, Navbar, MobileNavbar, Hero } from "./components/exportComponents";
import SignIn from "./Auth/SignIn";

function App() {
  const { setMobileMenuOpen, signInOpen, setSignInOpen } = useGlobalProps();

  // ------------------ Screen Sizes ------------------ //
  const [smallScreen, setSmallScreen] = useState(false);
  const [mediumScreen, setMediumScreen] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = maxSM();
      setSmallScreen(isSmall);
      setMediumScreen(maxMD());
      setLargeScreen(maxLG());

      if (!isSmall) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileMenuOpen]);
  // ------------------ Screen Sizes ------------------ //

  return (
    <>
      {mediumScreen ? <MobileNavbar /> : <Navbar />}
      {signInOpen && <SignIn/>}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/all-training-programs" element={<Programs />} />
        <Route path="/test" element={<TestHeadless />} />
        <Route path="/programs/:name" element={<ProgramDetails />} />
      </Routes>

      <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 w-full MAX_W px-[30px] max-sm:px-[15px] z-50 pointer-events-none">
        <div className="w-fit">
          <Chat />
        </div>
      </div>
    </>
  );
}

export default App;

// TO DO! 
// CREATE A SIGN UP PAGE 

// WHEN USER IS SIGNUP CAN BOOK A DATE FOR CONSULT AND A 
// EMAIL WITH AWAITING CONFIERMATION WILL BE SENT TO THE USER
