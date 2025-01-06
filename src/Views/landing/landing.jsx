import { useEffect, useState } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import UserAccess from "../../components/userAccess/userAccess";
import style from "./landing.module.css";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const Landing = () => {
  const [accesModalOpen, setAccesModalOpen] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    Cookies.remove("session_token");
    window.sessionStorage.removeItem("session_token");
  }, []);

  return (
    <div className={style.landingPage}>
      <AnimatePresence>
        {accesModalOpen && (
          <UserAccess close={setAccesModalOpen} setExit={setExit} />
        )}
      </AnimatePresence>
      {/* <PageLoader option="show" /> */}
      {exit && <PageLoader option="hidden" />}
      <div className={style.icon}>
        <p>zen</p>
      </div>
      <button
        onClick={() => {
          setAccesModalOpen(true);
        }}
      >
        Entrar
      </button>
    </div>
  );
};

export default Landing;
