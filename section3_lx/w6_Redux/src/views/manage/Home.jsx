import React from "react";
// import { bindActionCreators } from 'redux'
import { connect, useDispatch, useStore, useSelector } from 'react-redux'
// import userAction from '@/store/actions/user'
function Home(props) {
    console.log('home.props', props);
    const dispatch = useDispatch();
    const store = useStore();
    const userInfo = useSelector((state) => {
        return state.userInfo
    })
    console.log('userInfo', userInfo);

    return (
        <div>
            Home
            <button onClick={() => {
                dispatch({ type: 'logout' })
            }}>退出</button>
        </div>
    )
}
// const mapStateToProps=function(state){
//     return state
// }
// const mapDispatchToProps = function (dispatch) {
    // return {
    //     login(data) {
    //         dispatch(userAction.login(data))
    //     },
    //     logout(data) {
    //         dispatch(userAction.logout())
    //     }
    // }   
    //该行代码等效于上面代码
    // return bindActionCreators(userAction,dispatch)
// }

//userAction={login,logout}
// function bindActionCreators(actionCreators,dispatch){
//     const result={}
//     for(let key in actionCreators){
//         result[key]=function(){
//             // dispatch(actionCreators[key].apply(this.arguments))
//             dispatch(actionCreators[key](...args))
//         }
//     }
//     return result
// }

// Home =connect(mapStateToProps,mapDispatchToProps)(Home)

export default Home;
