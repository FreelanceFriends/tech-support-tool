import { combineReducers } from 'redux'
import {user} from './user.js'
import {page} from './page'
import { ticket } from './ticket.js'

const rootReducer = combineReducers({
  user,
  page,
  ticket
})

export default rootReducer