import { LOGIN, REGISTER_USER } from '../constants/constants';
import * as pageTypes from '../constants/PageActionTypes';
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
                error: false,
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
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
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
                errorMessage: "User Created Successfully !!!"
              }
            })
          }
          else {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: res.data.message
              }
            })
          }
      }).catch(err => 
        dispatch({
          type: pageTypes.ERROR_VALIDATION,
          payload: {
            error: true,
            errorMessage: err.message
          }
        })
      )
    }
}