import React from "react";
import context from "./context";
import Button from "../Button";
function TodoItem({ item, index }) {
    const { remove, complete } = React.useContext(context)
    return (

        <tr >
            <td><input type="checkbox" /></td>
            <td scope="row">{index + 1}</td>
            <td>{item.todo}</td>
            <td>{item.done ? <button className="btn btn-outline-secondary" disabled>是</button> : <button className="btn btn-outline-secondary" disabled >否</button>}</td>
            <td>{item.addtime}</td>
            <td>
                {/* {<button type="button" className="btn btn-primary" onClick={complete.bind(null, item.id)}>{item.done ? '取消' : '完成'}</button>
                <button type="button" className="btn btn-danger" onClick={remove.bind(null, item.id)}>删除</button> */}
                <Button className="btn-primary" onClick={complete.bind(null, item.id)}>{item.done ? '取消' : '完成'}</Button>
                <Button className="btn-danger" onClick={remove.bind(null,item.id)}>删除</Button>
            </td>
        </tr>
    )
}

export default TodoItem