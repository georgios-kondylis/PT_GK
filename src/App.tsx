import { Route, Routes } from "react-router-dom";
import { Navbar, MobileNavbar } from "./components/exportComponents";
import Hero from "./components/Hero/Hero";
import { useState, useEffect } from "react";
import { maxSM, maxMD, maxLG } from "./reusableFuntions";
import { useGlobalProps } from "./components/GlobalPropsProvider";
import Chat from "./components/AI/Chat";
import ProgramDetails from "./components/Programs/ProgramDetails";

function App() {
  const { setMobileMenuOpen } = useGlobalProps();

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

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileMenuOpen]);
  // ------------------ Screen Sizes ------------------ //

  return (
    <>
      {smallScreen ? <MobileNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/programs/:name" element={<ProgramDetails/>} />
      </Routes>

      <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 MAX_W w-full px-4 z-50">
        <Chat />
      </div>
    </>
  );
}

export default App;
