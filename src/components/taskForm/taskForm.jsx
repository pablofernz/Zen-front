import style from "./taskForm.module.css";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { createATask, getAllTasks, updateATask } from "../../redux/actions";

const TaskForm = ({ close, toUpdate, taskToUpdate }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    title: taskToUpdate?.title || "",
    description: taskToUpdate?.description || "",
    completed: taskToUpdate?.completed || false,
  });
  const [sentStatus, setSendStatus] = useState("not send");
  const [error, setError] = useState(taskToUpdate ? true : false);

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

  const postHandleChange = (event) => {
    setBody({
      ...body,
      [event.target.name]:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).replace(/^\s+/, "").replace(/\s\s+/g, " "),
    });
  };

  const updateHandleChange = (event) => {
    const updatedValue =
      event.target.value.charAt(0).toUpperCase() +
      event.target.value.slice(1).replace(/^\s+/, " ").replace(/\s\s+/g, " ");

    const updatedBody = {
      ...body,
      [event.target.name]: updatedValue,
    };

    setBody(updatedBody);

    setError(
      taskToUpdate.title === updatedBody.title &&
        taskToUpdate.description === updatedBody.description
    );
  };
  useEffect(() => {
    if (taskToUpdate) {
      setError(
        taskToUpdate.title === body.title &&
          taskToUpdate.description === body.description &&
          taskToUpdate.completed === body.completed
      );
    }
  }, [body, taskToUpdate]);

  const submit = () => {
    setSendStatus("pending");

    dispatch(createATask(body))
      .then((response) => {
        console.log(response);
        setSendStatus("sent");
        setTimeout(() => {
          close(false);
          dispatch(getAllTasks());
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const update = () => {
    setSendStatus("pending");
    console.log(body);
    dispatch(updateATask(taskToUpdate._id, body))
      .then((response) => {
        setSendStatus("sent");
        setTimeout(() => {
          close(false);
          dispatch(getAllTasks());
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className={style.component}
    >
      <div className={style.background} />
      <form
        className={style.card}
        onSubmit={(e) => {
          e.preventDefault(); // Evita el refresco de la página
          taskToUpdate ? update() : submit();
        }}
      >
        <header>
          <div className={style.headerIcon}>
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
          <p className={style.headerTitle}>
            {!toUpdate ? "Add the task details" : "Edit the task details"}
          </p>
          <button
            type="button"
            className={style.headerIcon}
            onClick={() => {
              close(false);
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

        <div className={style.body}>
          <div className={style.titleAndDescription}>
            <div className={style.inputContainer}>
              <input
                type="text"
                placeholder="Add a title of the task"
                value={body.title}
                name="title"
                onChange={taskToUpdate ? updateHandleChange : postHandleChange}
                maxLength={50}
              />
              <p className={style.charCounter}>
                {body.title.length < 10
                  ? `${body.title.length}/10`
                  : `${body.title.length}/50`}
              </p>
              <label>Title* </label>
            </div>

            <div className={style.inputContainer}>
              <textarea
                type="text"
                placeholder="Add a description of the task (optional)"
                className={style.textArea}
                value={body.description}
                name="description"
                onChange={taskToUpdate ? updateHandleChange : postHandleChange}
                maxLength={200}
              />
              <p className={style.charCounter}>{body.description.length}/200</p>
              <label>Description</label>
            </div>
          </div>

          <div className={style.status}>
            <div className={style.inputContainer} style={{ height: "100%" }}>
              <div className={style.options}>
                <button
                  onClick={() => {
                    setBody((prevBody) => ({ ...prevBody, completed: false }));
                  }}
                  type="button"
                  className={`${style.statusButton} ${
                    body.completed === false && style.selected
                  }`}
                >
                  <p>PENDING</p>
                </button>
                <button
                  onClick={() => {
                    setBody((prevBody) => ({ ...prevBody, completed: true }));
                  }}
                  type="button"
                  className={`${style.statusButton} ${
                    body.completed === true ? style.selected : ""
                  }`}
                >
                  <p>COMPLETE</p>
                </button>
              </div>
              <label>What is the task status</label>
            </div>
          </div>
        </div>

        <footer>
          <motion.button
            type="submit"
            className={`${style.submitButton} ${
              error || body.title.length < 10 ? style.disabled : ""
            }`}
            disabled={error || body.title.length < 10}
          >
            <AnimatePresence mode="popLayout">
              {sentStatus === "not send" && (
                <motion.div
                  key="not-send"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={style.submitButtonAux}
                >
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
                  <p>{taskToUpdate ? "Update Task" : "Add Task"}</p>
                </motion.div>
              )}

              {sentStatus === "pending" && (
                <motion.p
                  key="pending"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>
                    {taskToUpdate ? "Updathing the task" : "Creating the task"}
                  </p>
                </motion.p>
              )}

              {sentStatus === "sent" && (
                <motion.div
                  key="sent"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={style.submitButtonAux}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{taskToUpdate ? "Task updated" : "Task created"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </footer>
      </form>
    </motion.div>,
    document.getElementById("taskForm")
  );
};

export default TaskForm;
