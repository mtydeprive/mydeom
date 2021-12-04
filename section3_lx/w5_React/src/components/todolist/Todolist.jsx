import React,{PureComponent} from "react"
import TodoFrom from './TodoFrom'
import TodoContent from './TodoContent'
import TodoFoot from './TodoFoot'

import context from "./context"
import 'bootstrap/dist/css/bootstrap.css'
class Todolist extends PureComponent {
    // constructor() {
    //     super()
    //     //定义组件状态（数据）
    //     this.state = {
    //         // count:1,
    //         datalist: [
    //             {
    //                 id: 1,
    //                 todo: '定个小目标，赚它一个亿',
    //                 done: true,
    //                 addtime: Date.now() + 100
    //             },
    //             {
    //                 id: 2,
    //                 todo: '一天睡两年',
    //                 done: false,
    //                 addtime: Date.now() + 100
    //             },
    //             {
    //                 id: 3,
    //                 todo: '达成秒睡',
    //                 done: false,
    //                 addtime: Date.now() + 100
    //             },
    //         ]
    //     }
    //     // this.addItem = this.addItem.bind(this)
    //     // this.completeItem = this.completeItem.bind(this)
    //     // this.removeItem = this.removeItem.bind(this);
    // }
    state = {
        // count:1,
        selectIds:[],
        checked:false,
        datalist: [
            {
                id: 1,
                todo: '定个小目标，赚它一个亿',
                done: true,
                addtime: Date.now() + 100
            },
            {
                id: 2,
                todo: '一天睡两年',
                done: false,
                addtime: Date.now() + 100
            },
            {
                id: 3,
                todo: '达成秒睡',
                done: false,
                addtime: Date.now() + 100
            },
        ]
    }
    //在这里定义的方法会成为原型方法
    addItem=(todo)=> {
        const newItem = {
            id: parseInt(Math.random() * 10000),
            todo,
            done: false,
            addtime: Date.now()
        }
        //react 中不能直接修改原来的状态，而是使用一个新的值去覆盖
        const datalist = [...this.state.datalist]
        datalist.unshift(newItem)
        this.setState({
            datalist
        })
    }
    //定义时使用箭头函数
    completeItem=(id)=> {
        const { datalist } = this.state
        const newDatalist = datalist.map(item => {
            if (item.id === id) {
                item.done = !item.done
            }
            return { ...item }
        })
        this.setState({
            datalist: newDatalist
        })
    }
    removeItem=(id)=>  {
            // [{},{},{}] -> [{},{}]
            const newDatlist = this.state.datalist.filter(item=>item.id!==id).map(item=>({...item}))
        this.setState({
            datalist:newDatlist
        })
        console.log('newDatlist',newDatlist);
    }
    selectItem=(id)=> {
        const sleId=this.state.selectIds
        if(!sleId.includes(id)){
            sleId.push(id)
            this.setState({
                selectIds:sleId
            })
        }else{
            const idx=sleId.findIndex(item=>item===id)
            sleId.splice(idx,1)
        }
        console.log('selectIds',sleId);
    }
    render() {
        //在类组件中
        // console.log('todolist.render', this);
        const { datalist } = this.state
        return (
            <context.Provider value={{add:this.addItem, remove: this.removeItem, complete: this.completeItem,seleIds:this.selectItem}}>
                <div className="TodoList">
                    <TodoFrom  />
                    <TodoContent datalist={datalist} />
                    <TodoFoot datalist={datalist} />
                </div>
            </context.Provider>
        )
    }

}

export default Todolist;