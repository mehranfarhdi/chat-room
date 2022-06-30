export const setKeyAction = (key) => {
    return async (dispatch) => {
        await dispatch({ type: "GET_KEY", payload: key });
    };
};
