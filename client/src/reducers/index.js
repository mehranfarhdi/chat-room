import { combineReducers } from "redux";
import {keyReducer} from "./keyReducer";

export const reducers = combineReducers({
    secretKey : keyReducer,
});
