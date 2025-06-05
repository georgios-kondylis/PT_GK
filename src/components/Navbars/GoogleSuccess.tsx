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

  return <p>Logging in with Google...</p>;
};

export default GoogleSuccess;
