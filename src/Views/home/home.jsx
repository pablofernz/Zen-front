import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import { getAllTasks } from "../../Redux/actions";
import { useEffect, useRef, useState } from "react";
import TaskForm from "../../components/taskForm/taskForm";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "../../components/taskCard/taskCard";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import Search from "../../components/search/search";
import toast, { Toaster } from "react-hot-toast";
import useViewportWidth from "../../Hooks/useViewportWidth";
import Cookies from "js-cookie";

import { square } from "ldrs";
square.register();

const Home = () => {
  const dispatch = useDispatch();
  const viewportWidth = useViewportWidth();
  const [trialTasks, setTrialTasks] = useState(
    JSON.parse(window.sessionStorage.getItem("trial_mode_tasks")) || []
  );

  const tasks = !window.sessionStorage.getItem("trial_mode")
    ? useSelector((state) => state.allTasks)
    : JSON.parse(window.sessionStorage.getItem("trial_mode_tasks"))?.length == 0
    ? null
    : trialTasks;

  const [formOpen, setFormOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [roomType, setRoomType] = useState("normal");
  const [searchOpen, setSearchOpen] = useState(false);
  const [updateTaskFormOpen, setUpdateTaskFormOpen] = useState();
  const [upperTask, setUpperTask] = useState(0);
  const [trialModaOpen, setTrialModalOpen] = useState(
    window.sessionStorage.getItem("trial_mode") ? true : false
  );
  const [exit, setExit] = useState(false);

  // This code detect when its pressed ctrl + K to open the search modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Evita comportamientos predeterminados (si es necesario)
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // this useeffect fetch all the tasks when page is loaded and check if its not have any access, redirect to the landing
  useEffect(() => {
    if (
      !Cookies.get("session_token") &&
      !window.sessionStorage.getItem("session_token") &&
      !window.sessionStorage.getItem("trial_mode") &&
      !window.sessionStorage.getItem("demo_access")
    )
      window.location.href = "/";

    if (!window.sessionStorage.getItem("trial_mode")) dispatch(getAllTasks());
  }, []);

  const ref = useRef(null);

  // An array of colors for each task :p
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

  const tasksFiltered =
    taskStatus == "all" || viewportWidth > 700
      ? tasks
      : tasks?.filter((task) => task.completed == taskStatus);

  useEffect(() => {
    if (roomType == "zen") {
      toast("Try drag a task!", {
        duration: 3000,
        position: "bottom-right",
        icon: "✨",
        removeDelay: 1000,
      });
    }
  }, [roomType]);

  return (
    <div className={style.home}>
      {/* initial pageloader */}
      <PageLoader option="show" />
      {exit && <PageLoader option="hidden" />}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "black",
            fontFamily: "Trebuchet",
            fontWeight: "900",
            letterSpacing: "1px",
            color: "rgb(255, 255, 255)",
            borderRadius: "15px",
          },
        }}
      />
      {/* Search form Modal */}
      <AnimatePresence>
        {searchOpen && (
          <Search
            setSearchOpen={setSearchOpen}
            tasks={tasks}
            trialTasks={trialTasks}
          />
        )}
      </AnimatePresence>

      {/* Create task form Modal */}
      <AnimatePresence>
        {formOpen && (
          <TaskForm
            close={setFormOpen}
            toUpdate={false}
            setTrialTasks={setTrialTasks}
          />
        )}
      </AnimatePresence>

      {/* Update task form Modal */}
      <AnimatePresence>
        {updateTaskFormOpen && (
          <TaskForm
            close={setUpdateTaskFormOpen}
            toUpdate={true}
            taskToUpdate={updateTaskFormOpen}
            setTrialTasks={setTrialTasks}
          />
        )}
      </AnimatePresence>

      {/* Create task form Modal */}
      <AnimatePresence>
        {trialModaOpen && (
          <motion.div
            initial={{ opacity: 1, backdropFilter: "blur(0px)" }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { delay: 0.5 },
            }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            className={style.modalTrialMode}
          >
            <motion.div
              initial={{ scale: 1 }}
              exit={{ scale: 0, rotate: -22.5 }}
              animate={{ scale: 1, transition: { delay: 0.5 } }}
              transition={{ ease: "anticipate", duration: 1 }}
              className={style.modalCard}
            >
              <header>
                <div className={style.headerIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="25"
                    width="25"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className={style.headerTitle}>
                  {viewportWidth > 400
                    ? "This is a trial mode access"
                    : "Trial access mode"}
                </p>
                <button
                  className={style.headerIcon}
                  onClick={() => {
                    setTrialModalOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    height="30"
                    width="30"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>

              <div>
                <p>
                  Create and organize tasks for free, but to save them and
                  unlock more features, create an account.
                </p>
              </div>
              <footer>
                <button
                  className={style.signUpButton}
                  onClick={() => {
                    setExit(true);
                    setTimeout(() => {
                      window.location.pathname = "/";
                      window.sessionStorage.setItem("access_method", "login");
                    }, 1000);
                  }}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setTrialModalOpen(false);
                  }}
                >
                  Continue
                </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Things on top of the page */}
      <header>
        <div className={style.leftSide}>
          {viewportWidth > 900 ? (
            <div
              className={style.zenButton}
              onClick={() => {
                setRoomType(roomType == "normal" ? "zen" : "normal");
              }}
            >
              <p>zen</p>
              <div className={style.roomTypeContainer}>
                <div
                  onClick={() => {
                    setRoomType("normal");
                  }}
                >
                  {roomType == "normal" && (
                    <motion.div
                      layoutId="roomButton"
                      transition={{
                        ease: viewportWidth > 900 && "anticipate",
                        duration: viewportWidth > 900 && 1,
                      }}
                      style={{ borderRadius: "7px" }}
                    ></motion.div>
                  )}
                  <p>OFF</p>
                </div>
                <div>
                  {roomType == "zen" && (
                    <motion.div
                      layoutId="roomButton"
                      transition={{
                        ease: viewportWidth > 600 && "anticipate",
                        duration: viewportWidth > 600 && 1,
                      }}
                      style={{ borderRadius: "7px" }}
                    ></motion.div>
                  )}
                  <p>ON</p>
                </div>
              </div>
            </div>
          ) : (
            <p className={style.zenText}>zen</p>
          )}
        </div>

        <motion.div layout className={style.center}>
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout // Aplica layout al contenedor que envuelve ambos botones
            className={style.centerContainer}
          >
            {/* Botón de búsqueda */}
            <AnimatePresence mode="popLayout">
              <motion.button
                onClick={() => setSearchOpen(true)}
                className={style.taskSearcher}
                layout
              >
                <p>
                  {viewportWidth > 900 ? "Search a task..." : "Search a task"}
                </p>
                {viewportWidth > 900 && (
                  <div>
                    <p>Ctrl + K</p>
                  </div>
                )}
              </motion.button>

              {tasks !== null && (
                <motion.button
                  key="buttonHeader"
                  layoutId="taskFormButton"
                  className={style.newTaskButton}
                  onClick={() => setFormOpen(true)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <div className={style.newTaskIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      height="20"
                      width="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>

                  <p>New Task</p>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <div className={style.rightSide}>
          <div className={style.buttonsContainer}>
            <button
              onClick={() => {
                setTaskStatus("all");
              }}
            >
              {taskStatus === "all" &&
                (taskStatus !== true || taskStatus !== false) && (
                  <motion.div
                    layoutId="backgroundButton"
                    className={style.buttonBackground}
                    transition={{
                      ease: "anticipate",
                      duration: viewportWidth > 700 ? 1 : 0.5,
                    }}
                    style={{ borderRadius: "10px" }}
                  ></motion.div>
                )}
              <p>All</p>
            </button>
            <button
              onClick={() => {
                setTaskStatus(true);
              }}
            >
              {taskStatus === true && (
                <motion.div
                  layoutId="backgroundButton"
                  className={style.buttonBackground}
                  transition={{
                    ease: "anticipate",
                    duration: viewportWidth > 700 ? 1 : 0.5,
                  }}
                  style={{ borderRadius: "10px" }}
                ></motion.div>
              )}
              <p>Completed</p>
            </button>
            <button
              onClick={() => {
                setTaskStatus(false);
              }}
            >
              {taskStatus === false &&
                (taskStatus !== true || taskStatus !== "all") && (
                  <motion.div
                    layoutId="backgroundButton"
                    className={style.buttonBackground}
                    transition={{
                      ease: "anticipate",
                      duration: viewportWidth > 700 ? 1 : 0.5,
                    }}
                    style={{ borderRadius: "10px" }}
                  ></motion.div>
                )}
              <p>Pending</p>
            </button>
          </div>
        </div>
      </header>

      {/* Tasks container */}
      <main>
        <AnimatePresence>
          {tasks == null && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 1, ease: "anticipate" },
              }}
              layout
              key="noTasks"
              className={style.noTasks}
            >
              <h1>YOU DON'T HAVE ANY TASK!</h1>
              <p>
                Your list is empty. It's the perfect time to add new tasks and
                start organizing your day. Create one now and get productive!
              </p>
              <motion.button
                layoutId="taskFormButton"
                key="buttonMain"
                className={style.newTaskButton}
                onClick={() => {
                  setFormOpen(true);
                }}
              >
                <div className={style.newTaskIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>

                <p>Create One</p>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: tasks?.length > 0 && 1 }}
          className={style.tasksContainer}
          ref={ref}
          key="tasks"
          layout
        >
          <AnimatePresence mode="popLayout">
            {tasksFiltered?.map((task, index) => (
              <TaskCard
                key={index}
                taskData={task}
                container={ref}
                color={colors[index % colors.length]}
                zIndex={upperTask}
                setUpperTask={setUpperTask}
                upperTask={upperTask}
                taskStatusFiltered={taskStatus}
                roomType={roomType}
                setUpdateTaskFormOpen={setUpdateTaskFormOpen}
                setTrialTasks={setTrialTasks}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {tasks !== null && tasks.length <= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              key="loader"
              className={style.loader}
            >
              <l-square
                size="80"
                stroke="8"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="2"
                color="rgb(0, 0, 0)"
              ></l-square>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <a
        href="https://m.media-amazon.com/images/I/71g66k97cnL._AC_SL1500_.jpg"
        target="_blank"
        className={style.inspiration}
      >
        THE INSPIRATION CAME FROM...
      </a>
    </div>
  );
};

export default Home;
