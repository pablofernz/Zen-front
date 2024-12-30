import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import { getAllTasks } from "../../Redux/actions";
import { useEffect, useRef, useState } from "react";
import TaskForm from "../../components/taskForm/taskForm";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "../../components/taskCard/taskCard";
import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import Search from "../../components/search/search";
import { square } from "ldrs";
square.register();

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.allTasks);
  const [formOpen, setFormOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("all");
  const [roomType, setRoomType] = useState("normal");
  const [searchOpen, setSearchOpen] = useState(true);
  const [updateTaskFormOpen, setUpdateTaskFormOpen] = useState();

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

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const ref = useRef(null);

  function randomNumberInRange(min, max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomValue = array[0] / (0xffffffff + 1); // Normalizar a rango [0, 1)
    return Math.floor(randomValue * (max - min + 1) + min); // Escalar a rango deseado
  }

  const colors = [
    "rgb(125, 255, 164)",
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
  ];

  return (
    <div className={style.home}>
      <PageLoader option="load" />
      <AnimatePresence>
        {searchOpen && <Search setSearchOpen={setSearchOpen} tasks={tasks} />}
      </AnimatePresence>

      <AnimatePresence>
        {formOpen && <TaskForm close={setFormOpen} toUpdate={false} />}
      </AnimatePresence>

      <AnimatePresence>
        {updateTaskFormOpen && (
          <TaskForm
            close={setUpdateTaskFormOpen}
            toUpdate={true}
            taskToUpdate={updateTaskFormOpen}
          />
        )}
      </AnimatePresence>

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
                    transition={{ ease: "anticipate", duration: 1 }}
                    style={{ borderRadius: "7px" }}
                  ></motion.div>
                )}
                <p>OFF</p>
              </div>
              <div>
                {roomType == "zen" && (
                  <motion.div
                    layoutId="roomButton"
                    transition={{ ease: "anticipate", duration: 1 }}
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
              <p>Search a task...</p>
              <div>
                <p>Ctrl + K</p>
              </div>
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
                  stroke-width="3"
                  stroke="currentColor"
                  height="20"
                  width="20"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
              <motion.div
                key={index}
                className={style.taskCardContainer}
                initial={{ left: "0%", top: "0%", opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left:
                    roomType == "zen"
                      ? `${
                          randomNumberInRange(0, 77) - randomNumberInRange(0, 5)
                        }%`
                      : "0%",
                  top:
                    roomType == "zen"
                      ? `${
                          randomNumberInRange(0, 60) -
                          randomNumberInRange(0, 10)
                        }%`
                      : "0%",
                }}
                transition={{ ease: "anticipate", duration: 0.5 }}
              >
                <TaskCard
                  taskData={task}
                  reference={ref}
                  color={colors[index]}
                  zIndex={1}
                  taskStatusFiltered={taskStatus}
                  roomType={roomType}
                  setUpdateTaskFormOpen={setUpdateTaskFormOpen}
                />
              </motion.div>
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
    </div>
  );
};

export default Home;
