// import {CURRENT_USER_LOGOUT} from '../actions/user'

let userInfo=localStorage.getItem('userInfo');
try{
    userInfo=JSON.parse(userInfo)||{}
}catch(err){
    userInfo={}
}
const initState={
    userInfo,
}

const reducer=function(state=initState,action){
    switch(action.type){
        case 'login':
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
            return {
                ...state,
                userInfo:action.payload
            }
        case 'logout':
            localStorage.removeItem('userInfo')
            return{
                ...state,
                userInfo:{}
            }
        
        // 测试代码
        // case CURRENT_USER_LOGOUT:
        //     return {

        //     }

            default:
                return state;
    }
}

export default reducer;