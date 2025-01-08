import axios from "axios"
import Cookies from "js-cookie"

// const apiURL = "http://localhost:3001/api"
// const userURL = "http://localhost:3001/user"

const apiURL = "https://zen-api-anac.onrender.com/api"
const userURL = "https://zen-api-anac.onrender.com/user"

export const GET_ALL_TASKS = "GET_ALL_TASKS"
export const GET_COMPLETED_TASKS = "GET_COMPLETED_TASKS"
export const GET_ONE_TASK = "GET_ONE_TASK"
export const CREATE_A_TASK = "CREATE_A_TASK"
export const TASK_SEARCHER = "TASK_SEARCHER"
export const SET_UPPER_TASK = "SET_UPPER_TASK"

const tokenConfig = {
    headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("session_token") || Cookies.get("session_token")}`, // Agrega el token JWT al encabezado de autorización
        "Content-Type": "application/json", // Establece el tipo de contenido como JSON
    },
};


// --------------------- USER FUNCTIONS ----------------------------------
export const loginUser = async (body, isDemo) => {
    try {
        const response = await axios.post(`${userURL}/login`, body)
        if (isDemo == true) {
            window.sessionStorage.setItem("session_token", response.data.token)
        } else {
            Cookies.set("session_token", response.data.token)
        }

        return response.data

    } catch (error) {
        console.log(error)
        return error
    }
}

export const creatingUser = async (body) => {
    try {
        const response = await axios.post(`${userURL}/create`, body)
        Cookies.set("session_token", response.data.token)
        return response.data

    } catch (error) {
        console.log(error)
        return error
    }
}

// --------------------- TASKS FUNCTIONS ----------------------------------
// this use the forst GET to "/api/tasks" route (1/5)
export const getAllTasks = () => {
    return async function (dispatch) {
        try {

            const response = await axios.get(`${apiURL}/tasks`, tokenConfig)
            dispatch({
                type: GET_ALL_TASKS,
                payload: response.data.data
            })
            return response.data.success

        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_ALL_TASKS,
                payload: null
            })
        }
    }
}

// this use the "/api/tasks?completed" route (2/5)
export const getCompletedTasks = (completed) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${apiURL}/tasks/?completed=${completed}`, tokenConfig)
            dispatch({
                type: GET_COMPLETED_TASKS,
                payload: response.data.data
            })


        } catch (error) {
            dispatch({
                type: GET_COMPLETED_TASKS,
                payload: null
            })

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
            const response = await axios.get(`${apiURL}/tasks/${id}`, tokenConfig)
            dispatch({
                type: GET_ONE_TASK,
                payload: response.data.data
            })
            return response.data.data

        } catch (error) {
            console.log(error)
        }
    }
}

// this use the POST to "/api/tasks" route (3/5)
export const createATask = (body) => {
    return async function () {
        try {
            const response = await axios.post(`${apiURL}/tasks`, body, tokenConfig)
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
            const response = await axios.put(`${apiURL}/tasks/${id}`, newBody, tokenConfig)
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
            const response = await axios.delete(`${apiURL}/tasks/${id}`, tokenConfig)

        } catch (error) {
            console.log(error)
        }
    }
}

export const setUpperTask = (id) => {
    return async function (dispatch) {
        dispatch({
            type: SET_UPPER_TASK,
            payload: id
        })
    }
}
