import React from "react";
import Lifecycle from './components/Lifecycle'
import Todolist from "./components/todolist/Todolist";

class App extends React.Component{
    state={
        qty:1,
        idx:10,
        show:true
    }
    render(){
        const {qty,idx,show}=this.state
        return(
            <div className='container'>
                App
               { <Todolist/>}
              {/* { show?
              <Lifecycle idx={idx}/>
              :null
            }

               <button onClick={()=>{
                   this.setState({
                       qty:qty+1
                   })
               }}>qty:{qty}</button>
               <button onClick={()=>{
                   this.setState({
                       idx:idx+1
                   })
               }}>idx:{idx}</button>
               <button onClick={()=>{
                   this.setState({
                       show:!show
                   })
               }}>销毁组件</button> */}
            </div>
        )
    }
}

export default App;