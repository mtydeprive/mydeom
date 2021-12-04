
const CURRENT_USER_LOGOUT='CURRENT_USER_LOGOUT'
//一个用于创建{type：'login'}的函数
export function test(data){
    return {
        type:CURRENT_USER_LOGOUT,
        payload:data
    }
}
export function login(){
    return {
        type:'login',
        payload:data
    }
}
export function logout(){
    return {
        type:'logout',
    
    }
}

export default {
    login,
    logout,
}