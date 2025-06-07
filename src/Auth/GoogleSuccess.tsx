import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const _id = params.get("_id");
    const firstName = params.get("firstName");
    const lastName = params.get("lastName");
    const email = params.get("email");
    const image = params.get("image");

    if (token && _id && firstName && lastName && email && image) {
      const user = {
        _id,
        firstName,
        lastName,
        email,
        image,
      };

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user)); // Save as JSON string

      console.log("Logged in user:", user);

      navigate("/");
    }
  }, [navigate]);

 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] dark:bg-[#1e1e1e] text-center px-4">
    <div className="flex flex-col items-center gap-4 animate-pulse">
      <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-md">
        <img
          className="w-[22px] h-[22px]"
          src="/icons/googleLogo.png"
          alt="Google Logo"
        />
        <p className="text-[17px] font-medium text-gray-700 dark:text-gray-200">
          Logging you in with Google...
        </p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please wait while we authenticate your account
      </p>
      <div className="w-8 h-8 border-4 border-[#3298ff] border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

};

export default GoogleSuccess;
