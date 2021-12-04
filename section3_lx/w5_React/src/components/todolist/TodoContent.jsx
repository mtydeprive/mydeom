import React from "react";
import TodoItem from "./TodoItem";
import List from "../List";
import Button from "../Button";
import context from "./context";
function TodoContent({ datalist}) {
    const { remove, complete} = React.useContext(context)
    
    const column=[
        // {
        //     label:<input type="checkbox" />,
        //     render(row,idx){
        //         return <input type="checkbox" onChange={checked} onClick={seleIds(row.id)}/>
        //     }
        // },
        {
            label:'#',
            render(row,idx){
                return idx+1
            }
        },
        {
            label:'代办事项',
            dataKey:'todo'
        },
        {
            label:'是否完成',
            dataKey:'done',
            render(row){
                return row.done?'是':'否'
            }
        },
        {
            label:'操作',
            render(row){
                return(
                    <>
                        <Button className="btn-primary" onClick={complete.bind(null,row.id)}>{row.done===true?'取消':'完成'}</Button>
                        <Button className="btn-danger" onClick={remove.bind(null,row.id)}>删除</Button>
                    </>
                )
            }
        },
      ]
    return (
        <div className="TodoContent">
           {/* { <table className="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col"><input type="checkbox" 
                        /></th>
                        <th scope="col">#</th>
                        <th scope="col">待办事项</th>
                        <th scope="col">是否完成</th>
                        <th scope="col">时间</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datalist.map((item, idx) => {
                            return <TodoItem key={item.id} item={item} index={idx} />
                        })
                    }

                </tbody>
            </table>} */}
            <List rowKey="id" datasource={datalist} column={column}>

            </List>
        </div>
    )
}

export default TodoContent