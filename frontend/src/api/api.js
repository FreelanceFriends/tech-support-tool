import { GET_ALL_TICKET, LOGIN, REGISTER_USER, TICKET } from '../constants/constants';
import * as pageTypes from '../constants/PageActionTypes';
import * as ticketTypes from '../constants/ticketActionTypes';
import { DELETE, GET, POST, PUT } from './ApiActions';
import ApiExecutor from './ApiExecutor';


export function loginUser(data, callback) {
  
    return (dispatch) => {
      ApiExecutor(POST, LOGIN, data)
      .then(res => {
          if(res.status === 200) {
            
            let token = res.data.data.token
            localStorage.setItem('user_token', token)

            let {userId, email: userEmail, role: userRole} = JSON.parse(window.atob(token.split(".")[1])) 
            
            
            
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

export function signupuser(data, callback) {
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
            callback();
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

// Ticket actions
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
        dispatch(getTickets(TICKET));
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

export function getTickets(url, id=undefined) {
  if (id) url = `${url}${id}`
  return (dispatch) => {
    ApiExecutor(GET, url).then(res => {
      if(res.status === 200) {
        dispatch({
          type: ticketTypes.TICKET_FETCH_SUCCESS,
          payload: {
            tickets: res?.data?.data,
            error: true,
            errorType: "success",
            errorMessage: "Tickets fetched Successfullly!"
          }
        })
      }
      else {
        dispatch({
          type: ticketTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "warning",
            errorMessage: "Fetching Ticket failed!"
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

export function updateTicket(data, ticketId) {
  return (dispatch) => {
    ApiExecutor(PUT, `${TICKET}${ticketId}/`, data).then(res => {
      if(res.status === 200 || res.status === 201) {
        
        dispatch({
          type: ticketTypes.TICKET_UPDATE_SUCCESS,
          payload: {
            error: true,
            errorType: "success",
            errorMessage: "Tickets updated Successfullly!"
          }
        })

        // fetch all updated tickets
        dispatch(getTickets(GET_ALL_TICKET))
      }
      else {
        dispatch({
          type: ticketTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "warning",
            errorMessage: "Updating Ticket failed!"
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

export function deleteTicket(ticketId) {
  return (dispatch) => {
    ApiExecutor(DELETE, `${TICKET}${ticketId}/`).then(res => {
      if(res.status === 200 || res.status === 201) {
        
        dispatch({
          type: ticketTypes.TICKET_DELETE_SUCCESS,
          payload: {
            error: true,
            errorType: "success",
            errorMessage: "Tickets deleted Successfullly!"
          }
        })

        // fetch all updated tickets
        dispatch(getTickets(GET_ALL_TICKET))
      }
      else {
        dispatch({
          type: ticketTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorType: "warning",
            errorMessage: "Deleting Ticket failed!"
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