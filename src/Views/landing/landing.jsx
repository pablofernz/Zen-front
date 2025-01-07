import { useEffect, useRef, useState } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import UserAccess from "../../components/userAccess/userAccess";
import style from "./landing.module.css";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const Landing = () => {
  const [accesModalOpen, setAccesModalOpen] = useState(false);
  const [exit, setExit] = useState(false);
  const accessForm = useRef(null);

  useEffect(() => {
    Cookies.remove("session_token");
    window.sessionStorage.removeItem("session_token");
    window.sessionStorage.removeItem("demo_access");
  }, []);

  const tryHandler = () => {
    window.sessionStorage.setItem("trial_mode", true);
    window.sessionStorage.setItem("trial_mode_tasks", "[]");

    setExit(true);
    setTimeout(() => {
      window.location.href = "/noteboard";
    }, 1000);
  };

  return (
    <div className={style.landingPage}>
      <AnimatePresence>
        {accesModalOpen && (
          <UserAccess
            close={setAccesModalOpen}
            setExit={setExit}
            reference={accessForm}
          />
        )}
      </AnimatePresence>
      <PageLoader option="show" />
      {exit && <PageLoader option="hidden" />}

      <header>
        <p className={style.zenText}>zen</p>
      </header>
      <main>
        <div className={style.upper}>
          <h1>Focus. Organize. Achieve</h1>
          <h2>
            Zen helps you organize your day with ease: create tasks, focus on
            priorities, and track your progress—all in a clean, minimalist
            interface.
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
              <button
                className={style.getStarted}
                onClick={() => {
                  setAccesModalOpen(true);
                }}
              >
                Get started
              </button>
              <button className={style.alternativeButton} onClick={tryHandler}>
                Try it out
              </button>
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
