import React from "react";
import {withRouter,useHistory} from 'react-router-dom'
function Reg(props){
    console.log('reg.props',props);
    const history=useHistory()
    console.log('reg.history',history);
    return(
        <div>
            Reg
        </div>
    )
}
// Reg=withRouter(Reg)
export default Reg;