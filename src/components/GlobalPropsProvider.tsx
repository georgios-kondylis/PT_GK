import React, {createContext, useContext, useState, useEffect, ReactNode, SetStateAction,} from 'react';
import { userTypes } from '../utils/types';

// 1. Define your types
type GlobalProps = {
  mobileMenuOpen: boolean;
  toggleMobileMenuOpen: () => void;
  setMobileMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  signInOpen: boolean;
  setSignInOpen: React.Dispatch<SetStateAction<boolean>>
  signUpOpen: boolean;
  setSignUpOpen: React.Dispatch<SetStateAction<boolean>>
  newRefresh: () => void;
  REFRESH: boolean;
  logoutModalIsOPen : boolean;
  setLogoutModalIsOpen: React.Dispatch<SetStateAction<boolean>>
  user: userTypes | null;
  setUser: React.Dispatch<SetStateAction<userTypes | null>>
};

// 2. Create context with default (fallback) value
const GlobalContext = createContext<GlobalProps | undefined>(undefined);

// 3. Provider component
export const GlobalPropsProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userTypes | null>(null);

  const [REFRESH, setREFRESH] = useState<boolean>(false);
  const newRefresh = () => setREFRESH(prev => !prev);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [signInOpen, setSignInOpen] = useState<boolean>(false)
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false)
  const [logoutModalIsOPen, setLogoutModalIsOpen] = useState<boolean>(false);

  const toggleMobileMenuOpen = () => setMobileMenuOpen((prev) => !prev);


  // Set user from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: userTypes = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from sessionStorage:", error);
      }
    }
  }, [signInOpen, REFRESH]);
 

  return (
    <GlobalContext.Provider value={{ mobileMenuOpen, toggleMobileMenuOpen, setMobileMenuOpen,
      signInOpen, setSignInOpen, signUpOpen, setSignUpOpen,
      logoutModalIsOPen, setLogoutModalIsOpen,
      newRefresh, REFRESH,
      user, setUser,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 4. Custom hook
export const useGlobalProps = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalProps must be used within GlobalPropsProvider');
  return context;
};
