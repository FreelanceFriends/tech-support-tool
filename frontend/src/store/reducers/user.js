import { ERROR_VALIDATION, LOGIN_SUCCESS, REGISTER_SUCCESS , GET_TECHNICIAN} from "../../constants/PageActionTypes";

const initialState = {
    userRole: "",
    userId: "",
    userEmail: "",
    error: false,
    errorMessage: "",
    errorType: "",
    technicians: [],
    isAuthenticated: false
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_TECHNICIAN:
            return {...state, technicians: [...action.payload.technicians]}
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