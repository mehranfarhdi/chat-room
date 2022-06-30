export const  keyReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_KEY":
            return { ...action.payload };
        default:
            return state;
    }
};
