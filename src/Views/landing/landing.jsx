import { useEffect, useRef, useState, lazy, Suspense } from "react";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
const UserAccess = lazy(() => import("../../components/userAccess/userAccess"));
import style from "./landing.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import useViewportWidth from "../../Hooks/useViewportWidth";

const generateCard = (color, left, top) => {
  return (
    <motion.div
      whileTap={{
        cursor: "grabbing",
      }}
      whileHover={{
        cursor: "grab",
      }}
      drag
      dragTransition={{ bounceStiffness: 500, bounceDamping: 20, power: 1 }}
      dragElastic={0.2}
      className={style.card}
      style={{
        backgroundColor: color,
      }}
      initial={{ left: left, top: top }}
    >
      <header></header>
      <div>
        <div
          style={{
            width: "100%",
            backgroundColor: color,
          }}
        ></div>
        <div
          style={{
            width: "80%",
            backgroundColor: color,
          }}
        ></div>

        <div
          style={{
            width: "50%",
            backgroundColor: color,
          }}
        ></div>
      </div>
      <span className={style.iconOption}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={color}
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <footer>
        <div
          style={{
            width: "50%",
            backgroundColor: color,
          }}
        ></div>
        <div
          style={{
            width: "40%",
            backgroundColor: color,
          }}
        ></div>
      </footer>
    </motion.div>
  );
};

const Landing = () => {
  const [accesModalOpen, setAccesModalOpen] = useState(
    window.sessionStorage.getItem("access_method") ? true : false
  );
  const [exit, setExit] = useState(false);
  const [formType, setFormType] = useState();
  const [menuOptions, setMenuOptions] = useState(false);
  const [isLogged, setIsLogged] = useState(!!Cookies.get("session_token"));
  const accessForm = useRef(null);

  useEffect(() => {
    window.sessionStorage.removeItem("session_token");
    window.sessionStorage.removeItem("demo_access");
    window.sessionStorage.removeItem("access_method");
  }, []);

  const tryHandler = () => {
    window.sessionStorage.setItem("trial_mode", true);
    window.sessionStorage.setItem("trial_mode_tasks", "[]");

    setExit(true);
    setTimeout(() => {
      window.location.href = "/noteboard";
    }, 1000);
  };

  const colors = [
    "rgb(151, 255, 182)",
    "rgb(177, 125, 255)",
    "rgb(125, 194, 255)",
    "rgb(255, 125, 125)",
    "rgb(125, 125, 255)",
    "rgb(181, 207, 255)",
    "rgb(255, 225, 125)",
    "rgb(210, 255, 192)",
    "rgb(252, 192, 255)",
    "rgb(255, 211, 192)",
    "rgb(190, 148, 242)",
    "rgb(208, 238, 255)",
  ];

  const generateSquare = (color, left, top) => {
    return (
      <motion.div
        whileTap={{
          cursor: "grabbing",
        }}
        whileHover={{
          cursor: "grab",
        }}
        drag
        dragTransition={{ bounceStiffness: 500, bounceDamping: 20, power: 1 }}
        dragElastic={0.2}
        style={{
          backgroundColor: { color },
          height: "100px",
          width: "100px",
          borderRadius: "2px",
        }}
        initial={{ top: top, left: left }}
        // animate={{ top: top, left: left }}
      ></motion.div>
    );
  };
  return (
    <div className={style.landingPage}>
      <AnimatePresence>
        {accesModalOpen && (
          <Suspense fallback={<div></div>}>
            <UserAccess
              accessModalOpen={accesModalOpen}
              close={setAccesModalOpen}
              setExit={setExit}
              reference={accessForm}
              formType={formType}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <PageLoader option="show" />
      {exit && <PageLoader option="hidden" />}

      {/* <p className={style.zenText}>zen</p> */}
      <div className={style.headerButtonsContainer}>
        {isLogged && (
          <div className={style.userContainer}>
            <button
              className={style.userButton}
              onClick={() => {
                setMenuOptions(!menuOptions);
              }}
            >
              <img
                src="https://res.cloudinary.com/dnrprmypf/image/upload/v1728605983/Projects%20Images/Indico/Clients%20Photos/User%20default%20photo.png"
                alt="userPhoto"
              />
            </button>
            <motion.p
              animate={{ rotate: menuOptions ? 180 : 0 }}
              transition={{ ease: "anticipate", duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="black"
                height="20"
                width="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </motion.p>
            <AnimatePresence>
              {menuOptions && (
                <motion.div
                  key="menuOptions"
                  initial={{ y: -10, opacity: 0 }}
                  exit={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "anticipate", duration: 0.5 }}
                  className={style.menuOptions}
                >
                  <div className={style.option} style={{ userSelect: "none" }}>
                    <div className={style.icon}>
                      {JSON.parse(window.localStorage.getItem("user_data"))
                        .authMethod == "google" && (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 488 512"
                          height="20px"
                          width="20px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                      )}

                      {JSON.parse(window.localStorage.getItem("user_data"))
                        .authMethod == "github" && (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 496 512"
                          height="25px"
                          width="25px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                        </svg>
                      )}
                      {!JSON.parse(window.localStorage.getItem("user_data"))
                        .authMethod && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          height="22px"
                          width="22px"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className={style.text}>
                      {
                        JSON.parse(window.localStorage.getItem("user_data"))
                          .email
                      }
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      Cookies.remove("session_token");
                      window.localStorage.clear();
                      setIsLogged(false);
                      setMenuOptions(false);
                    }}
                    className={style.option}
                    style={{ backgroundColor: "rgb(58, 0, 0)" }}
                  >
                    <div
                      className={style.icon}
                      style={{ color: " rgb(170, 8, 8)" }}
                    >
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        width="20"
                        height="20"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div
                      className={style.text}
                      style={{ color: " rgb(166, 0, 0)" }}
                    >
                      Log out of this account
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <main>
        <div className={style.upper}>
          <h1>
            {useViewportWidth() > 700
              ? "Organize Your Day. Achieve More."
              : "Focus Organize Achieve"}
          </h1>
          <h2>
            Zen simplifies your tasks so you can focus on what matters.
            Prioritize, progress, and celebrate every win.
          </h2>
          {isLogged ? (
            <div className={style.buttonsContainer}>
              <button
                className={style.getStarted}
                onClick={() => {
                  setExit(true);
                  setTimeout(() => {
                    window.location.pathname = "/noteboard";
                  }, 1000);
                }}
              >
                My Noteboard
              </button>
              <button
                className={style.alternativeButton}
                onClick={() => {
                  Cookies.remove("session_token");
                  window.localStorage.removeItem("user_data");
                  setIsLogged(false);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className={style.buttonsContainer}>
              <button
                className={style.getStarted}
                onClick={() => {
                  setAccesModalOpen(true);
                  setFormType("login");
                }}
              >
                Get started
              </button>
              <button className={style.alternativeButton} onClick={tryHandler}>
                Try it now
              </button>
            </div>
          )}
        </div>
        <div className={style.tasksContainer}>
          {useViewportWidth() > 700
            ? generateCard(colors[1], "95%", "10%")
            : generateCard(colors[1], "95%", "15%")}
          {useViewportWidth() > 700
            ? generateCard(colors[3], "5%", "-80px")
            : generateCard(colors[3], "-30%", "-20px")}
          {generateCard(colors[5], "30%", "80%")}
          {useViewportWidth() > 700
            ? generateCard(colors[0], "70%", "65%")
            : generateCard(colors[0], "-30%", "90%")}
          {useViewportWidth() > 700 && generateCard(colors[6], "-5%", "85%")}
          {useViewportWidth() > 700 && generateCard(colors[8], "50%", "-100px")}
          {generateCard(colors[9], "90%", "95%")}
          {/* {generateSquare(colors[9], "30%", "5%")} */}
          {/* 
          {generateCard(colors[5])}
          {generateCard(colors[0])}
          {generateCard(colors[6])} */}
        </div>
      </main>
    </div>
  );
};

export default Landing;
