import { combineReducers, createStore} from "redux";
import { createStoreHook } from "react-redux";
import todoReducer from "todo.js"
const reducer = combineReducers({
    todo: todoReducer
});

export default createStore(reducer);