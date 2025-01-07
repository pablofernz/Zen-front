import style from "./search.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedTasks,
  getOneTask,
  taskSearcher,
} from "../../Redux/actions";
import TaskCard from "../taskCard/taskCard";

import { square } from "ldrs";
square.register();

import useViewportWidth from "../../Hooks/useViewportWidth";

const Search = ({ setSearchOpen }) => {
  const dispatch = useDispatch();
  const tasksAvailables = useSelector((state) => state.allTasksAux);

  const [preview, setPreview] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [search, setSearch] = useState("");
  const viewportWidth = useViewportWidth();
  const [statusTaskSearched, setStatusTaskSearched] = useState("");

  // this function update the "search" value to the input value
  const searchHandler = (event) => {
    setSearch(event.target.value);
    dispatch(taskSearcher(event.target.value));
  };

  // This function calls an action by giving it an ID and takes care of looking up that task
  const searchByIDHandler = (id) => {
    dispatch(getOneTask(id))
      .then((response) => {
        setTaskData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // this detect when "Escape" key its pressed to close the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // this function is responsible for obtaining all tasks depending on their status
  const completeHandler = (event) => {
    dispatch(getCompletedTasks(event.target.value))
      .then(() => {
        setStatusTaskSearched(
          event.target.selectedOptions[0].getAttribute("status")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getCompletedTasks(""));
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className={style.component}
    >
      <div className={style.background} />

      <div className={style.card}>
        <AnimatePresence mode="popLayout">
          {/* if doesnt click in any task, it will be rendered the task searcher */}
          {!preview ? (
            <motion.div
              key="taskSearcher"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={style.taskSearcher}
            >
              <header>
                <input
                  type="text"
                  placeholder={
                    viewportWidth < 350
                      ? "Search..."
                      : viewportWidth < 600
                      ? "Type to search"
                      : "Search any task..."
                  }
                  className={style.searchInput}
                  onChange={searchHandler}
                  value={search}
                />
                <select
                  className={style.selectButton}
                  onChange={completeHandler}
                >
                  <option value="" status="">
                    All
                  </option>
                  <option value={true} status="completed">
                    Completed
                  </option>
                  <option value={false} status="pending">
                    Pending
                  </option>
                </select>
                <button
                  className={style.closeButton}
                  onClick={() => {
                    setSearchOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    height="25"
                    width="25"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>

              <AnimatePresence>
                {tasksAvailables == null && (
                  <motion.div
                    className={style.loaderContainer}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p>
                      You don't have any {statusTaskSearched} task <br />
                      {statusTaskSearched == "completed"
                        ? "Go complete somes."
                        : "Go add somes."}
                    </p>
                  </motion.div>
                )}
                {tasksAvailables !== null && tasksAvailables.length < 1 && (
                  <motion.div
                    className={style.loaderContainer}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <l-square
                      size="70"
                      stroke="5"
                      stroke-length="0.25"
                      bg-opacity="0.1"
                      speed="2"
                      color="rgb(207, 207, 207)"
                    ></l-square>
                  </motion.div>
                )}

                {tasksAvailables !== null && tasksAvailables.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={style.tasksContainer}
                  >
                    <AnimatePresence>
                      {tasksAvailables?.map((task, index) => (
                        <motion.button
                          onClick={() => {
                            searchByIDHandler(task._id);
                            setPreview(true);
                          }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          key={index}
                          className={style.taskCard}
                        >
                          <div className={style.taskIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              height="30"
                              width="30"
                            >
                              <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                              <path
                                fillRule="evenodd"
                                d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                                clipRule="evenodd"
                              />
                              <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                            </svg>
                          </div>
                          <h1>{task.title}</h1>
                          <div className={style.taskIcon2}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              height="20"
                              width="20"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                              />
                            </svg>
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            // if a task is previewed, it will be rendered his task card
            <motion.div
              key="taskPreview"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={style.taskPreview}
            >
              <button
                className={style.backButton}
                onClick={() => {
                  setPreview(false);
                  setTaskData([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  height="30"
                  width="30"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <AnimatePresence mode="popLayout">
                {taskData.length > 0 ? (
                  <motion.div
                    className={style.taskContainer}
                    key="taskCardPreview"
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <TaskCard
                      taskData={taskData[0]}
                      color={"rgb(125, 255, 164)"}
                      zIndex={1}
                      taskStatusFiltered={"all"}
                      roomType={"normal"}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="taskCardLoader"
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <l-square
                      size="70"
                      stroke="5"
                      stroke-length="0.25"
                      bg-opacity="0.1"
                      speed="2"
                      color="rgb(207, 207, 207)"
                    ></l-square>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>,
    document.getElementById("search")
  );
};

export default Search;
