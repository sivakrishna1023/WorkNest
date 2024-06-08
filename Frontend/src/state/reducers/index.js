import { combineReducers } from "redux";
import reducer from "./userreducer"

const reducers=combineReducers({
    userdetails:reducer
})

export default reducers