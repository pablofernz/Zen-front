import { useEffect, useState } from "react";
import style from "./taskCard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { getAllTasks, deleteATask, updateATask } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import useViewportWidth from "../../Hooks/useViewportWidth";

const TaskCard = ({
  reference,
  color,
  taskData,
  taskStatusFiltered,
  roomType,
  setUpdateTaskFormOpen,
}) => {
  const [isPinned, setIsPinned] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const dispatch = useDispatch();
  const viewportWidth = useViewportWidth();

  // This function is responsible for deleting a task by the ID provided when it is called
  const deleteHandler = () => {
    dispatch(deleteATask(taskData._id))
      .then((response) => {
        console.log(response);
        setOptionsOpen(false);
        setTimeout(() => {
          dispatch(getAllTasks());
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This function update the status of the task
  const updateHandler = () => {
    const newBody = {
      title: taskData.title,
      description: taskData.description,
      completed: !taskData.completed,
    };

    dispatch(updateATask(taskData._id, newBody))
      .then((response) => {
        console.log(response);
        setOptionsOpen(false);
        setTimeout(() => {
          dispatch(getAllTasks());
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      drag={roomType == "normal" || isPinned ? false : true}
      dragConstraints={reference} //ref of his parent container
      className={style.taskCard}
      //both of this funcionts manage the cursor pointer
      onDragStart={() => {
        setIsDragged(true);
      }}
      onDragEnd={() => {
        setIsDragged(false);
      }}
      style={{
        zIndex: isPinned ? "5" : "0",
        cursor:
          roomType == "normal" || isPinned
            ? "default"
            : isDragged
            ? "grabbing"
            : isHovered
            ? "grab"
            : "default",
      }}
      animate={{
        filter:
          taskStatusFiltered === "all"
            ? "blur(0px) opacity(1) saturate(1)"
            : taskStatusFiltered == taskData.completed
            ? "blur(0px) opacity(1) saturate(1)"
            : "blur(5px) opacity(0.5) saturate(0.4)",

        pointerEvents:
          taskStatusFiltered === "all"
            ? "all"
            : taskStatusFiltered == taskData.completed
            ? "all"
            : "none",

        zIndex:
          taskStatusFiltered === "all"
            ? "1"
            : taskStatusFiltered == taskData.completed
            ? "1"
            : "0",

        x: roomType == "normal" && 0,
        y: roomType == "normal" && 0,
      }}
      transition={{ ease: "anticipate", duration: 1 }}
    >
      {/* The shadow of the task card */}
      {viewportWidth > 350 && (
        <div className={style.background} style={{ backgroundColor: color }} />
      )}

      {/* This is the option menu */}
      <AnimatePresence>
        {optionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            exit={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "anticipate", duration: 0.5 }}
            className={style.menu}
          >
            <button className={style.menuOption} onClick={updateHandler}>
              <div className={style.optionIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div className={style.optionText}>
                {taskData.completed ? "Set to Pending" : "Set to Completed"}
              </div>
            </button>
            <button
              className={style.menuOption}
              onClick={() => {
                setUpdateTaskFormOpen(taskData);
                setOptionsOpen(false);
              }}
            >
              <div className={style.optionIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </div>
              <div className={style.optionText}>Edit</div>
            </button>

            <button className={style.menuOption} onClick={deleteHandler}>
              <div className={style.optionIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={style.optionText}>Delete</div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the interior of the card */}
      <div
        className={style.dataCard}
        style={{ backgroundColor: color }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
      >
        {/* the button thats open the menu */}
        <div className={style.options}>
          <button
            onClick={() => {
              setOptionsOpen(!optionsOpen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              height="30"
              width="30"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* the button thats pin the task in zen mode*/}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: roomType == "zen" ? 0.3 : isPinned ? 0.7 : 0 }}
          transition={{ ease: "anticipate", duration: 1 }}
          disabled={roomType == "normal"}
          className={style.pin}
          onClick={() => {
            setIsPinned(!isPinned);
          }}
        >
          <svg
            stroke="black"
            fill="black"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="25px"
            width="25px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z"></path>
          </svg>
        </motion.button>

        {/* title of the task */}
        <header>
          <p className={style.title} style={{ color: color }}>
            {taskData.title}
          </p>
        </header>

        {/* description of the task */}
        <div className={style.titleAndDescription}>
          <p className={style.description} style={{ color: color }}>
            {taskData.description}
          </p>
        </div>

        {/* status of the task */}
        <footer>
          <motion.div className={style.status}>
            <div style={{ backgroundColor: color }} />
            <p style={{ color: color }}>
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="15px"
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                </svg>
              </span>
              {taskData.completed ? "COMPLETED" : "PENDING"}
            </p>
          </motion.div>

          {/* this replace "2024" for "24" */}
          <div style={{ color: color }} className={style.readMore}>
            {taskData.createdAt?.replace(
              /(\d{2})-(\d{2})-(\d{4})/,
              (_, d, m, y) => `${d}-${m}-${y.slice(2)}`
            )}
          </div>
        </footer>
      </div>
    </motion.div>
  );
};
export default TaskCard;
