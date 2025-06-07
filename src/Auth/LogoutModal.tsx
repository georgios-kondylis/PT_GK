import React from 'react';
import { useGlobalProps } from '../components/GlobalPropsProvider';

const LogoutModal = () => {
  const { setLogoutModalIsOpen, setUser, newRefresh } = useGlobalProps();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setLogoutModalIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-mainLightDark text-white p-6 rounded-xl shadow-xl w-[90%] max-w-[400px]">
        <h2 className="text-xl mb-4 font-semibold">Log out</h2>
        <p className="text-sm mb-6">Are you sure you want to Log out?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setLogoutModalIsOpen(false)}
            className="px-4 py-2 rounded hover:bg-white hover:text-black border transition1"
          >
            Cancel
          </button>
          <button onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition1"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
