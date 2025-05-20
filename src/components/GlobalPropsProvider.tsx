import React, {createContext, useContext, useState, ReactNode, SetStateAction,} from 'react';

// 1. Define your types
type GlobalProps = {
  mobileMenuOpen: boolean;
  toggleMobileMenuOpen: () => void;
  setMobileMenuOpen: React.Dispatch<SetStateAction<boolean>>;
};

// 2. Create context with default (fallback) value
const GlobalContext = createContext<GlobalProps | undefined>(undefined);

// 3. Provider component
export const GlobalPropsProvider = ({ children }: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenuOpen = () => setMobileMenuOpen((prev) => !prev);

  return (
    <GlobalContext.Provider value={{ mobileMenuOpen, toggleMobileMenuOpen, setMobileMenuOpen 
      
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
