import { useNavigate } from "react-router-dom";
import style from "./404.module.css";
import useViewportWidth from "../../Hooks/useViewportWidth";
import { useState } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import Cookies from "js-cookie";

const NotFound = () => {
  const navigate = useNavigate();
  const token =
    Cookies.get("session_token") ||
    window.sessionStorage.getItem("session_token");
  const [exit, setExit] = useState(false);
  return (
    <div className={style.container}>
      <PageLoader option={"show"} />
      {exit && <PageLoader option={"hidden"} />}
      <div className={style.page}>
        <img
          className={style.errorImage}
          src="https://res.cloudinary.com/dnrprmypf/image/upload/v1735930113/Projects%20Images/Zen/Utils/404_Error-cuate_vptvl4.png"
          alt=""
        />

        <button
          className={style.button2}
          onClick={() => {
            setExit(true);
            setTimeout(() => {
              window.location.href = token ? "/noteboard" : "/";
            }, 1000);
          }}
        >
          GO HOME
        </button>
      </div>
    </div>
  );
};

export default NotFound;
