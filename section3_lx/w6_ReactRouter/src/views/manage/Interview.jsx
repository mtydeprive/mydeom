import React from "react";
import { Switch, Redirect, Route } from 'react-router-dom'
import List from './interview/List'
import Add from './interview/Add'
import Edit from './interview/Edit'
function Interview({match}){

        return(
            <div>
                <Switch>
                    <Route path={match.path +"/list"} component={List}/>
                    <Route path={match.path +"/add"} component={Add}/>
                    <Route path={match.path +"/edit/:id"} component={Edit}/>
                    <Redirect from={match.path} to={match.path +"/list"} exact ></Redirect>  
                </Switch>
            
            </div>
        )

}
export default Interview;
