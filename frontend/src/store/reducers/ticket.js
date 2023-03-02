import { ERROR_VALIDATION } from '../../constants/PageActionTypes'
import { TICKET_CREATE_SUCCESS } from '../../constants/ticketActionTypes';

const initialState = {
    ticket: null,
    error: false,
    errorMessage: "",
    errorType: ""
};

export const ticket = (state = initialState, action) => {

    switch (action.type) {
        case ERROR_VALIDATION: 
            return { ...state, error: action.payload.error, errorMessage: action.payload.errorMessage, errorType: action.payload.errorType };
        case TICKET_CREATE_SUCCESS:
            return { ...state, error: action.payload.error, errorMessage: action.payload.errorMessage, errorType: action.payload.errorType }
        
        // case 'ALL_DISCUSSION' : {
        //     return {...state, discussions: action.payload.discussions}
        // }
        default:
            return state;
    }
}