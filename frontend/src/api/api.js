import { LOGIN, REGISTER_USER, TICKET } from '../constants/constants';
import * as pageTypes from '../constants/PageActionTypes';
import * as ticketTypes from '../constants/ticketActionTypes';
import { POST } from './ApiActions';
import ApiExecutor from './ApiExecutor';


export function loginUser(data, callback) {
  
    return (dispatch) => {
      ApiExecutor(POST, LOGIN, data)
      .then(res => {
          if(res.status === 200) {
            
            let token = res.data.data.token
            let {userId, email: userEmail, role: userRole} = JSON.parse(window.atob(token.split(".")[1])) 
            
            localStorage.setItem('user_token', token)
            
            dispatch({
              type: pageTypes.LOGIN_SUCCESS,
              payload: {
                userId,
                userEmail,
                userRole,
                isAuthenticated: true,
                error: true,
                errorType: "success",
                errorMessage: "LoggedIn Successfully !!!"
              }
            })
            callback()
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                isAuthenticated: false,
                errorType: "warning",
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "error",
            isAuthenticated: false,
            errorMessage: err.message
          }
        })
      )
    }
}

export function signupuser(data) {
    return (dispatch) => {
      ApiExecutor(POST, REGISTER_USER, data)
      .then(res => {
          if(res.status === 201) {
            dispatch({
              type: pageTypes.REGISTER_SUCCESS,
              payload: {
                error: false,
                errorType: "success",
                errorMessage: "User Created Successfully !!!"
              }
            })
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorType: "warning",
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "error",
            errorMessage: err.message
          }
        })
      )
    }
}


export function createTicket(data) {
  return (dispatch) => {
    ApiExecutor(POST, TICKET, data).then(res => {
      if(res.status === 201 || res.status === 200) {
        dispatch({
          type: ticketTypes.TICKET_CREATE_SUCCESS,
          payload: {
            error: true,
            errorType: "success",
            errorMessage: "Ticket created Successfullly!"
          }
        })
      }
      else {
        dispatch({
          type: ticketTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "warning",
            errorMessage: "Ticket crate failed!"
          }
        })
      }
    }).catch(err => 
      dispatch({
        type: ticketTypes.ERROR_VALIDATION,
        payload: {
          error: true,
          errorType: "error",
          errorMessage: err.message
        }
      })
    )
  }
}