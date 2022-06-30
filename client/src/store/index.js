import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducers/index";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk, loadingBarMiddleware())
    )
);
