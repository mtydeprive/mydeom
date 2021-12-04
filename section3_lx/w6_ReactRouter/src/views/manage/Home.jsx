import React from "react";
import { Redirect } from "react-router";
import {withUser,withStorage,withStorages,withLogin} from "../../utils/hoc";
function Home(props){
    console.log('home.props',props);
    // if(已登录){
    //     显示Home组件代码
    // }else{
    //     跳到登录页面
    // }
    // if(props.userInfo.token){

        return(
            <div>
                Home
            </div>
        )
    // }else{
    //     <Redirect to="/login"></Redirect>
    // }
}
//Home:OuterComponent
// Home = withUser(Home)
// Home = withStorage('cartlist')(Home)
Home = withStorages('cartlist','token')(Home)
// Home =withLogin(Home)
export default Home;
