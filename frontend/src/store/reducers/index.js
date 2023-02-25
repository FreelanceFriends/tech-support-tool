import { combineReducers } from 'redux'
import {user} from './user.js'
import {page} from './page'

const rootReducer = combineReducers({
  user,
  page
})

export default rootReducer