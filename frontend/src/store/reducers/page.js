import { ERROR_VALIDATION } from '../../constants/PageActionTypes'
const initialState = {
    error: false,
    errorMessage: ""
};

export const page = (state = initialState, action) => {

    switch (action.type) {
        case ERROR_VALIDATION: {
            return { ...state, error: action.payload.error, errorMessage: action.payload.errorMessage }
        }
        // case 'ALL_DISCUSSION' : {
        //     return {...state, discussions: action.payload.discussions}
        // }
        default:
            return state;
    }
}