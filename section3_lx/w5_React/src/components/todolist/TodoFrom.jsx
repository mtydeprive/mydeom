import React from "react";
import context from "./context";
import Button from "../Button";
class TodoFrom extends React.Component {
    // constructor(props,context) {console.log('contxt',context);
    //     super(props)
    //     this.state = {
    //         todo: ''
    //     }
    //     // this.addItem = this.addItem.bind(this)
    //     // this.changeTodo = this.changeTodo.bind(this)
    // }
    state = {
        todo: ''
    }
    addItem = () => {
        // 非受控组件：节点操作方式
        // const todo=this.input.value // this.refObj.current.value
        // 组件受控：组件状态操作方式
        const todo = this.state.todo

        // this.props.addItem(todo)
        this.context.add(todo)
        //清空并自动获得焦点
        this.setState({
            todo: ''
        })
        this.input.focus()
    }
    changeTodo = (e) => {
        this.setState({
            todo: e.target.value
        })
    }
    render() {
        //创建ref对象
        // this.refObj=React.createRef()
        // console.log('todoform.render',this);
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    ref={(el) => this.input = el}
                    // ref={this.refObj}
                    value={this.state.todo}
                    onChange={this.changeTodo}
                />
                {/* {<button className="btn btn-success" onClick={this.addItem}>添加</button>} */}
                {/* {                <Button className="btn-success"><strong>添加</strong><span>add</span></Button>} */}
                <Button className="btn-success" onClick={this.addItem}>添加</Button>
            </div>
        )
    }
}
TodoFrom.contextType = context
export default TodoFrom