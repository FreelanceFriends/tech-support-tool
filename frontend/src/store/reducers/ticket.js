import { ERROR_VALIDATION } from '../../constants/PageActionTypes'
import { TICKET_CREATE_SUCCESS, TICKET_DELETE_SUCCESS, TICKET_FETCH_SUCCESS, TICKET_UPDATE_SUCCESS } from '../../constants/ticketActionTypes';

const initialState = {
    tickets: null,
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
        case TICKET_FETCH_SUCCESS:
            return { ...state, tickets: action.payload.tickets, error: action.payload.error, errorMessage: action.payload.errorMessage, errorType: action.payload.errorType }
        case TICKET_DELETE_SUCCESS:
            return { ...state, error: action.payload.error, errorMessage: action.payload.errorMessage, errorType: action.payload.errorType }
        case TICKET_UPDATE_SUCCESS:
            return { ...state, error: action.payload.error, errorMessage: action.payload.errorMessage, errorType: action.payload.errorType }
        // case 'ALL_DISCUSSION' : {
        //     return {...state, discussions: action.payload.discussions}
        // }
        default:
            return state;
    }
}