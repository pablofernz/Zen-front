import axios from "axios"
// const apiURL = "http://localhost:3001/api"
const apiURL = "https://zen-api-anac.onrender.com/api"

export const GET_ALL_TASKS = "GET_ALL_TASKS"
export const GET_COMPLETED_TASKS = "GET_COMPLETED_TASKS"
export const GET_ONE_TASK = "GET_ONE_TASK"
export const CREATE_A_TASK = "CREATE_A_TASK"
export const TASK_SEARCHER = "TASK_SEARCHER"


// this use the forst GET to "/api/tasks" route (1/5)
export const getAllTasks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${apiURL}/tasks`)
            dispatch({
                type: GET_ALL_TASKS,
                payload: response.data.data
            })
            return response.data.success

        } catch (error) {
            console.log(error)
        }
    }
}

// this use the "/api/tasks?completed" route (2/5)
export const getCompletedTasks = (completed) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${apiURL}/tasks/?completed=${completed}`)
            dispatch({
                type: GET_COMPLETED_TASKS,
                payload: response.data.data
            })
            return response.data.success

        } catch (error) {
            console.log(error)
        }
    }
}

// this filter the obtained tasks with words or letters
export const taskSearcher = (task) => {
    return async function (dispatch) {
        dispatch({
            type: TASK_SEARCHER,
            payload: task
        })
    }
}

// this use the second GET to "/api/tasks/:id" route (3/5)
export const getOneTask = (id) => {
    return async function (dispatch) {

        try {
            const response = await axios.get(`${apiURL}/tasks/${id}`)
            if (response) return response.data.data
            dispatch({
                type: GET_ONE_TASK,
                payload: response.data.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// this use the POST to "/api/tasks" route (3/5)
export const createATask = (body) => {
    return async function () {
        try {
            const response = await axios.post(`${apiURL}/tasks`, body)
            if (response) return response.data

        } catch (error) {
            if (error) return error.response.data
        }
    }
}

// this use the PUT to "/api/tasks/:id" route (4/5)
export const updateATask = (id, newBody) => {
    return async function () {
        try {
            const response = await axios.put(`${apiURL}/tasks/${id}`, newBody)
            if (response) return response.data

        } catch (error) {
            if (error) return error.response.data
            console.log(error)
        }
    }
}

// this use the DELETE to "/api/tasks/:id" route (5/5)
export const deleteATask = (id) => {
    return async function () {
        try {
            const response = await axios.delete(`${apiURL}/tasks/${id}`)
            if (response) console.log(response.data.message)

        } catch (error) {
            console.log(error)
        }
    }
}

