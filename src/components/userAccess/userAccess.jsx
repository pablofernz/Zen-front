import style from "./userAccess.module.css";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import validate from "./validations";
import useViewportWidth from "../../Hooks/useViewportWidth";

const Register = ({ setAccessUsed }) => {
  const dispatch = useDispatch();
  const width = useViewportWidth();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const registerHandler = (event) => {
    setErrors({ ...errors, [event.target.name]: "" });
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = () => {
    const errorsBeforeSubmit = validate(registerData);

    if (!!Object.keys(errorsBeforeSubmit).length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: errorsBeforeSubmit.email || "",
        password: errorsBeforeSubmit.password || "",
      }));
      console.log("hubo errores");
      return;
    }

    console.log("registro exitoso", registerData);
  };
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -400 }}
      exit={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "anticipate", duration: 1 }}
      className={style.registerContent}
    >
      <header>
        <h1>Are you new here?</h1>
        <p>Complete the form to create your noteboard</p>
      </header>

      <div>
        <div className={style.inputContainer}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={registerData.email}
            onChange={registerHandler}
            name="email"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className={`${style.input} ${errors.email && style.inputError}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />

          <label
            className={`${style.label} ${errors.email && style.labelError}`}
          >
            {errors.email || "Email"}{" "}
          </label>
        </div>
        <div className={style.inputContainer}>
          <AnimatePresence>
            {registerData.password.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={style.eye}
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword == false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </motion.button>
            )}
          </AnimatePresence>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            name="password"
            value={registerData.password}
            onChange={registerHandler}
            className={`${style.input} ${errors.password && style.inputError}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />

          <label
            className={`${style.label} ${errors.email && style.labelError}`}
          >
            <p>{errors.password || "Password"}</p>
          </label>
        </div>
        <div className={style.buttonsContainer}>
          <button onClick={submitHandler}>Create account</button>
          <div className={style.othersButtonsContainer}>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 488 512"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>

      <footer className={style.footer}>
        <p>
          Already have an account?{" "}
          <button
            onClick={() => {
              setAccessUsed("login");
            }}
          >
            Log in.
          </button>
        </p>
      </footer>
    </motion.div>
  );
};

const Login = ({ setAccessUsed }) => {
  const width = useViewportWidth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (event) => {
    setErrors({ ...errors, [event.target.name]: "" });
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = () => {
    const errorsBeforeSubmit = validate(loginData);

    if (!!Object.keys(errorsBeforeSubmit).length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: errorsBeforeSubmit.email || "",
        password: errorsBeforeSubmit.password || "",
      }));
      console.log("hubo errores");
      return;
    }

    console.log("inicio de sesion exitoso", loginData);
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 400 }}
      exit={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ease: "anticipate", duration: 1 }}
      className={style.loginContent}
    >
      <header>
        <h1>Welcome Back</h1>
        <p>Good to see you again!</p>
      </header>

      <div>
        <div className={style.inputContainer}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={loginData.email}
            onChange={loginHandler}
            name="email"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className={`${style.input} ${errors.email && style.inputError}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />

          <label
            className={`${style.label} ${errors.email && style.labelError}`}
          >
            {errors.email || "Email"}
          </label>
        </div>
        <div className={style.inputContainer}>
          <AnimatePresence>
            {loginData.password.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={style.eye}
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword == false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </motion.button>
            )}
          </AnimatePresence>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            name="password"
            value={loginData.password}
            onChange={loginHandler}
            className={`${style.input} ${errors.password && style.inputError}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />

          <label
            className={`${style.label} ${errors.password && style.labelError}`}
          >
            <p>{errors.password || "Password"}</p>
            <button style={{ color: "gray" }}>Recover password</button>
          </label>
        </div>
        <div className={style.buttonsContainer}>
          <button onClick={submitHandler}>Log In</button>
          <div className={style.othersButtonsContainer}>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 488 512"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>

      <footer className={style.footer}>
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => {
              setAccessUsed("register");
            }}
          >
            Sign up.
          </button>
        </p>
      </footer>
    </motion.div>
  );
};

const UserAccess = ({ close }) => {
  const [accessUsed, setAccessUsed] = useState("login");
  const width = useViewportWidth();
  // this detech when "Escape" key its pressed to close the form
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(5px)",
        transition: { duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
        transition: { delay: 0.5 },
      }}
      className={style.component}
    >
      <div className={style.background} />

      <motion.div
        initial={{
          y: "100dvh",
          scale: 0.5,
        }}
        animate={{
          y: "0dvh",
          scale: 1,
        }}
        exit={{ y: "100dvh", scale: 0 }}
        transition={{ ease: "anticipate", duration: 1 }}
        className={style.card}
      >
        <motion.div
          animate={{
            x:
              width < 700 && accessUsed == "login"
                ? "0%"
                : width < 700 && accessUsed == "register"
                ? "-100%"
                : width > 700 && "0%",
          }}
          transition={{ ease: "anticipate", duration: 1 }}
        >
          <div className={style.rightSide}>
            <AnimatePresence>
              {accessUsed == "login" && <Login setAccessUsed={setAccessUsed} />}
            </AnimatePresence>
          </div>
          <div className={style.leftSide}>
            <AnimatePresence>
              {accessUsed == "register" && (
                <Register setAccessUsed={setAccessUsed} />
              )}
            </AnimatePresence>
          </div>

          {width > 700 && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{
                x: accessUsed == "login" ? "100%" : "0%",
              }}
              transition={{ ease: "anticipate", duration: 1 }}
              className={style.imageSlider}
            >
              <img
                src="https://res.cloudinary.com/dnrprmypf/image/upload/v1735865026/Projects%20Images/Zen/Utils/8c98a1c3-0031-45c8-aae5-e503fe55e2bd.png"
                alt=""
              />
              <div className={style.icon}>
                <p>zen</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.getElementById("userAccess")
  );
};

export default UserAccess;