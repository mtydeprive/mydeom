import {createStore} from 'redux'

let userInfo=localStorage.getItem('userInfo');
try{
    userInfo=JSON.parse(userInfo)||{}
}catch(err){
    userInfo={}
}
console.log('reduxInit',userInfo);
const state={
    userInfo,
    collapse:true,
}

//接收state与action作为参数
// 必须返回一个新的state
const reducer=function(state,action){
    console.log('reducer',state,action);
    // if(action.type==='login'){

    // }else if(action.type==='logout'){
    //     return {userInfo:{}}
    // }
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
    }
    return state;
}
const store=createStore(reducer,state)

console.log('store',store);

//@测试代码

//监听state修改
// store.subscribe(function(){
//     console.log('state修改',store.getState());

// })

// // 获取state
// console.log('state1=',store.getState());
// //修改
// // store.dispatch({type:'login',payload:{username:'laoxe',password:123}})

// //修改state
// // store.dispatch(action)

// console.log('state2=',store.getState());
export default store
