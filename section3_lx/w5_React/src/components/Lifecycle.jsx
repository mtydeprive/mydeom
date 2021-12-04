import React,{PureComponent} from "react";

//旧版本创建类
// React.createClass({
//     getDefaultProps
//     getInitialState(){
//         return{}
//     }
// })
// class Lifecycle extends Component{
class Lifecycle extends PureComponent{
    //1.生命周期初始化阶段
    constructor(){
        super()
        this.state={
            count:1,
            goods:{},
        }
        console.log('construcor');
    }
    //2.挂载阶段
    // componentWillMount ->> UNSAFE_componentWillMount
    UNSAFE_componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');

        //ajax
        // setTimeout(()=>{
        //     this.setState({
        //         goods:{
        //             name:"goods",
        //             price:{
        //                 old:998,
        //                 sales:9.8
        //             }
        //         }
        //     },()=>{
        //         console.log(this.state.goods);
        //     })
        // },2000)
    }
    // 3.更新阶段
    // componentWillUpdate ->>  UNSAFE_componentWillUpdate
    UNSAFE_componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(prevProps, prevState){
        // prevProps->this.props (qty:1->2)
        // prevState->this.state (count:1->2)
        console.log('componentDidUpdate');
    }
    //4.特殊钩子函数
    //componentWillReceiveProps ->UNSAFE_componentWillReceiveProps
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
      
    }

    //shouldComponentUpdate一般用于组件性能优化
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('shouldComponentUpdate',nextProps,this.props);
    //     // this.props  -> nextProps (qty:1->qty:2)
    //     // this.state -> nextState  (count:1->count:2)

    //     // 业务逻辑count的值为5的倍数时刷新组件，否则不刷新
    //     // console.log('qty',nextState.count);
    //     // return nextState.count%5===0

    //     //优化父组件属性子组件也跟着刷新的场景
    //     if(nextProps.idx!==this.props.idx || nextState.count!==this.state.count){
    //         return true
    //     }
    //     return false
    // }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        console.log('render');
        const {count,goods}=this.state
        return(
            <div>
                组件生命周期
                <button onClick={()=>{
                    this.setState({
                        count:this.state.count+1
                    })
                }}>count:{count}</button>

                <p>商品名称：{goods.name}</p>
                {
                    goods.price ?
                <p>价格：<del>{goods.price&&goods.price.old}</del><span>{goods.price.sales}</span></p>
                :null
            }
            </div>
        )
    }
}

export default Lifecycle;