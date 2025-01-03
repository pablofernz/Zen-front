import { useState } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import UserAccess from "../../components/userAccess/userAccess";
import style from "./landing.module.css";
import { AnimatePresence } from "framer-motion";

const Landing = () => {
  const [accesModalOpen, setAccesModalOpen] = useState(true);
  return (
    <div className={style.landingPage}>
      <AnimatePresence>
        {accesModalOpen && <UserAccess close={setAccesModalOpen} />}
      </AnimatePresence>
      {/* <PageLoader option="load" /> */}
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
