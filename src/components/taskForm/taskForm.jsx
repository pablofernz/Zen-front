import style from "./taskForm.module.css";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { createATask, getAllTasks, updateATask } from "../../Redux/actions";

import toast, { Toaster } from "react-hot-toast";

const TaskForm = ({ close, toUpdate, taskToUpdate }) => {
  const dispatch = useDispatch();
  // this makes sense when want update a task, obtaining the old data from the parent before the update
  const [body, setBody] = useState({
    title: taskToUpdate?.title || "",
    description: taskToUpdate?.description || "",
    completed: taskToUpdate?.completed || false,
  });
  const [sentStatus, setSendStatus] = useState("not send");

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

  // This handle the values of the body.title and body.description
  const postHandleChange = (event) => {
    setBody({
      ...body,
      [event.target.name]:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).replace(/^\s+/, "").replace(/\s\s+/g, " "),
    });
  };

  //This handle the values of the body.title and body.description of the new task data
  const updateHandleChange = (event) => {
    const updatedValue =
      event.target.value.charAt(0).toUpperCase() +
      event.target.value.slice(1).replace(/^\s+/, " ").replace(/\s\s+/g, " ");

    const updatedBody = {
      ...body,
      [event.target.name]: updatedValue,
    };

    setBody(updatedBody);
  };

  // this grab the data of body and make a POST
  const submit = async () => {
    const loading = toast.loading("Creating the task", {
      position: "bottom-right",
    });
    try {
      setSendStatus("sending");

      const response = await dispatch(createATask(body));
      if (response.success) {
        toast.dismiss(loading);
        toast.success(response.message, {
          position: "bottom-right",
        });
        setSendStatus("sent");

        setTimeout(() => {
          close(false);
          dispatch(getAllTasks());
        }, 1500);
      } else {
        setSendStatus("not send");
        toast.dismiss(loading);
        toast.error(response.errors[0] || response.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loading);
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  // this grab the data of new body and make a PUT
  const update = async () => {
    const loading = toast.loading("Updating the task", {
      position: "bottom-right",
    });
    try {
      setSendStatus("sending");

      const response = await dispatch(updateATask(taskToUpdate._id, body));
      console.log(response);

      if (response.success) {
        toast.dismiss(loading);
        toast.success(response.message, {
          position: "bottom-right",
        });
        setSendStatus("sent");

        setTimeout(() => {
          close(false);
          dispatch(getAllTasks());
        }, 1500);
      } else {
        setSendStatus("not send");
        toast.dismiss(loading);
        toast.error(response.errors[0], {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.message, {
        position: "bottom-right",
      });
    }

    // setSendStatus("pending");
    // console.log(body);
    // dispatch(updateATask(taskToUpdate._id, body))
    //   .then((response) => {
    //     setSendStatus("sent");
    //     setTimeout(() => {
    //       close(false);
    //       dispatch(getAllTasks());
    //     }, 1500);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className={style.component}
    >
      <div className={style.background} />

      {/* this manage the popups */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "rgb(20,20,20)",
            fontFamily: "Trebuchet",
            fontWeight: "900",
            letterSpacing: "1px",
            color: "gray",
            borderRadius: "15px",
          },
        }}
      />

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
            {/* Input for the title */}
            <div className={style.inputContainer}>
              <input
                type="text"
                placeholder="Add a title of the task"
                value={body.title}
                name="title"
                onChange={taskToUpdate ? updateHandleChange : postHandleChange}
                maxLength={80}
              />
              <p className={style.charCounter}>
                {body.title.length < 10
                  ? `${body.title.length}/10`
                  : `${body.title.length}/80`}
              </p>
              <label>Title* </label>
            </div>

            {/* Input for the description */}
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

          {/* buttons container for the status */}
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

        {/* submit button */}
        <footer>
          <motion.button
            type="submit"
            className={`${style.submitButton}
             ${sentStatus == "sending" ? style.disabled : ""}
            `}
            disabled={sentStatus == "sending" || sentStatus == "sent"}
          >
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
          </motion.button>
        </footer>
      </form>
    </motion.div>,
    document.getElementById("taskForm")
  );
};

export default TaskForm;
