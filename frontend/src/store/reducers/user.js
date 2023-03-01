import { ERROR_VALIDATION, LOGIN_SUCCESS, REGISTER_SUCCESS } from "../../constants/PageActionTypes";

const initialState = {
    userRole: "",
    userId: "",
    userEmail: "",
    error: false,
    errorMessage: "",
    isAuthenticated: false
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, ...action.payload}
        case REGISTER_SUCCESS:
            return {...state, ...action.payload} 
        case ERROR_VALIDATION:
            return {...state, ...action.payload} 
        default:
            return state;
    }
}