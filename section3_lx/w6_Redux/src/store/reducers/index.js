import {combineReducers} from 'redux'
import user from './user'
import common from './common'
import interview from './interview'
import Permission from './permission'


const reducer=combineReducers({
    user,
    common,
    interview,
    Permission,
})

export default reducer;