import axios from "axios"
// const apiURL = "http://localhost:3001/api"
const apiURL = "https://zen-api-anac.onrender.com/api"

export const GET_ALL_TASKS = "GET_ALL_TASKS"
export const GET_COMPLETED_TASKS = "GET_COMPLETED_TASKS"
export const GET_ONE_TASK = "GET_ONE_TASK"
export const CREATE_A_TASK = "CREATE_A_TASK"
export const TASK_SEARCHER = "TASK_SEARCHER"

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

export const taskSearcher = (task) => {
    return async function (dispatch) {
        dispatch({
            type: TASK_SEARCHER,
            payload: task
        })
    }
}

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


export const createATask = (body) => {
    return async function () {
        try {
            const response = await axios.post(`${apiURL}/tasks`, body)
            if (response) return response.data.success

        } catch (error) {
            console.log(error)
        }
    }
}
export const updateATask = (id, newBody) => {
    return async function () {
        try {
            const response = await axios.put(`${apiURL}/tasks/${id}`, newBody)
            if (response) console.log(response.data.message)

        } catch (error) {
            console.log(error)
        }
    }
}

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

