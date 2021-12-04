import React from "react";
import {Route,HashRouter,Redirect,Switch,Link,NavLink,withRouter}  from 'react-router-dom'
import Login from "./views/Login";

import Manage from './views/Manage'
import './App.scss'
import 'antd/dist/antd.css';
class App extends React.Component{
    goto=(url)=>{
        this.props.history.push(url)
    }
   render(){
       console.log('app.props',this.props);
       return(
           <div className="container">
        
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/manage" component={Manage} />
                </Switch>
               
           </div>
       )
   }
}


export default withRouter(App);