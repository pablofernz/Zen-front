import { useEffect } from "react";

const Docs = () => {
  useEffect(() => {
    window.location.href = "https://zen-api-anac.onrender.com/docs";
  }, []);

  return null; // No necesitas renderizar nada en este caso
};

export default Docs;
