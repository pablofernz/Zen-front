import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Cambié esto para usar la exportación correcta
import reducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk)) // Aplicamos thunk como middleware
);

export default store;