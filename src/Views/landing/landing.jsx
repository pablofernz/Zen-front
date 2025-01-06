import { useEffect, useState } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import UserAccess from "../../components/userAccess/userAccess";
import style from "./landing.module.css";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import TaskCard from "../../components/taskCard/taskCard";

const Landing = () => {
  const [accesModalOpen, setAccesModalOpen] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    Cookies.remove("session_token");
    window.sessionStorage.removeItem("session_token");
  }, []);
  const colors = [
    "rgb(151, 255, 182)",
    "rgb(177, 125, 255)",
    "rgb(125, 194, 255)",
    "rgb(255, 125, 125)",
    "rgb(125, 255, 222)",
    "rgb(125, 125, 255)",
    "rgb(255, 255, 255)",
    "rgb(125, 242, 255)",
    "rgb(181, 207, 255)",
    "rgb(255, 225, 125)",
    "rgb(210, 255, 192)",
    "rgb(252, 192, 255)",
    "rgb(255, 211, 192)",
    "rgb(208, 238, 255)",
  ];
  return (
    <div className={style.landingPage}>
      <AnimatePresence>
        {accesModalOpen && (
          <UserAccess close={setAccesModalOpen} setExit={setExit} />
        )}
      </AnimatePresence>
      {/* <PageLoader option="show" /> */}
      {exit && <PageLoader option="hidden" />}

      <header>
        <p className={style.zenText}>zen</p>
      </header>
      <main>
        <div className={style.upper}>
          <h1>Focus. Organize. Achieve</h1>
          <h2>
            Zen is here to help you take control of your day. Create your task
            lists, focus on what matters, and mark off your accomplishments—all
            with a clean, minimalist interface designed for clarity and
            simplicity.
          </h2>
        </div>
        <div className={style.bottom}>
          <div className={style.cardSpace}>
            <div className={style.card} style={{ height: "100%" }}></div>
          </div>
          <div className={style.cardSpace}>
            <div className={style.card} style={{ height: "75%" }}></div>
          </div>
          <div className={style.cardSpace2}>
            <div className={style.buttonsContainer}>
              <button className={style.getStarted} onClick={() => {
                setAccesModalOpen(true)
              }}>Get started</button>
              <button className={style.alternativeButton}>Try it out</button>
            </div>
            <div
              className={style.card}
              style={{ height: "50%", backgroundColor: "rgb(222, 222, 222)" }}
            ></div>
          </div>
          <div className={style.cardSpace}>
            <div className={style.card} style={{ height: "75%" }}></div>
          </div>
          <div className={style.cardSpace}>
            <div className={style.card} style={{ height: "100%" }}></div>
          </div>
        </div>
      </main>

      {/* <button
        onClick={() => {
          setAccesModalOpen(true);
        }}
      >
        Entrar
      </button> */}
    </div>
  );
};

export default Landing;
