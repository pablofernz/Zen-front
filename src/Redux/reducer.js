import { GET_ALL_TASKS, GET_ONE_TASK, GET_COMPLETED_TASKS, TASK_SEARCHER, SET_UPPER_TASK } from "./actions";

const sessionStoreTasks = JSON.parse(window.sessionStorage.getItem("trial_mode_tasks"))

let initialstate = {
    allTasks: [],
    particularTask: [],
    allTasksAux: sessionStoreTasks || [],
    searchedTasks:sessionStoreTasks || [],
    upperTask: { id: "", index: 1 }
};

let reducer = (state = initialstate, action) => {
    switch (action.type) {

        case GET_ALL_TASKS:
            return {
                ...state, allTasks: action.payload, allTasksAux: action.payload,
            }
        case GET_COMPLETED_TASKS:
            return {
                ...state, allTasksAux: action.payload, searchedTasks: action.payload
            }
        case GET_ONE_TASK:
            return {
                ...state, particularTask: action.payload
            }

        case TASK_SEARCHER:
            const aux2 = [...state.searchedTasks];
            const taskSearched = action.payload.trim() === ""
                ? aux2
                : aux2.filter((task) =>
                    task.title.toLowerCase().includes(action.payload.toLowerCase())
                );
            return {
                ...state,
                allTasksAux: taskSearched.length === 0 ? null : taskSearched,
            };

        case SET_UPPER_TASK:
            return {
                ...state, upperTask: { ...state.upperTask, id: action.payload, index: state.upperTask.index + 1 }
            }


        default:
            return { ...state }

    }
}

export default reducer;