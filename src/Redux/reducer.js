import { GET_ALL_TASKS, GET_ONE_TASK, GET_COMPLETED_TASKS, TASK_SEARCHER } from "./actions";

let initialstate = {
    allTasks: [],
    particularTask: [],
    allTasksAux: [],
    searchedTasks: []
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
            console.log(action.payload)
            const aux2 = [...state.searchedTasks];
            const taskSearched = action.payload.trim() === "" ? aux2 : aux2.filter((task) =>
                task.title.toLowerCase().includes(action.payload.toLowerCase()))

            return {
                ...state,
                allTasksAux: taskSearched,
            };


        default:
            return { ...state }

    }
}

export default reducer;