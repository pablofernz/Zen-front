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

import { square } from "ldrs";
square.register();

const Home = () => {
  const dispatch = useDispatch();
  const viewportWidth = useViewportWidth();

  const tasks = useSelector((state) => state.allTasks);

  const [formOpen, setFormOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [roomType, setRoomType] = useState("normal");
  const [searchOpen, setSearchOpen] = useState(false);
  const [updateTaskFormOpen, setUpdateTaskFormOpen] = useState();
  const [upperTask, setUpperTask] = useState(0);

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

  // this useeffect fetch all the tasks when page is loaded
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const ref = useRef(null);

  // literally the name says it
  function randomNumberInRange(min, max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomValue = array[0] / (0xffffffff + 1); // Normalizar a rango [0, 1)
    return Math.floor(randomValue * (max - min + 1) + min); // Escalar a rango deseado
  }

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
      <PageLoader option="load" />
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
        {searchOpen && <Search setSearchOpen={setSearchOpen} tasks={tasks} />}
      </AnimatePresence>

      {/* Create task form Modal */}
      <AnimatePresence>
        {formOpen && <TaskForm close={setFormOpen} toUpdate={false} />}
      </AnimatePresence>

      {/* Update task form Modal */}
      <AnimatePresence>
        {updateTaskFormOpen && (
          <TaskForm
            close={setUpdateTaskFormOpen}
            toUpdate={true}
            taskToUpdate={updateTaskFormOpen}
          />
        )}
      </AnimatePresence>

      {/* Things on top of the page */}
      <header>
        <div className={style.leftSide}>
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
        </div>
        <div className={style.center}>
          <div className={style.centerContainer}>
            <button
              onClick={() => {
                setSearchOpen(true);
              }}
              className={style.taskSearcher}
            >
              <p>
                {viewportWidth > 900 ? "Search a task..." : "Search a task"}
              </p>
              {viewportWidth > 900 && (
                <div>
                  <p>Ctrl + K</p>
                </div>
              )}
            </button>
            <button
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

              <p>New Task</p>
            </button>
          </div>
        </div>
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
                    transition={{ ease: "anticipate", duration: 1 }}
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
                  transition={{ ease: "anticipate", duration: 1 }}
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
                    transition={{ ease: "anticipate", duration: 1 }}
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: tasks.length > 0 && 1 }}
          layout
          className={style.tasksContainer}
          ref={ref}
          key="tasks"
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => (
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
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {tasks.length <= 0 && (
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

