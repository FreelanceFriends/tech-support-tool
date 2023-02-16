import * as pageTypes from '../constants/PageActionTypes'
import axios from "axios";
// const serverUrl = 'http://localhost:8080';
const serverUrl = "";

export function loginUser(data) {
    return (dispatch) => {
      axios.post(serverUrl + '/api/v1/login', data)
      .then(res => {
          if(res.status === 200) {
            localStorage.setItem('token', 'Bearer ' + res.data.token)
            localStorage.setItem('username', res.data.username)
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
                errorMessage: "LoggedIn Successfully !!!"
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

export function signupuser(data) {
    return (dispatch) => {
      axios.post(serverUrl + '/api/v1/signup', data)
      .then(res => {
          if(res.status === 201) {
            dispatch({
              type: pageTypes.ERROR_VALIDATION,
              payload: {
                error: true,
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