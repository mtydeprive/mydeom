import React from "react";
import PropTypes from 'prop-types'
class List extends React.PureComponent{
    //静态属性
    //ES7开始支持静态属性
    static propTypes ={
        datasource:PropTypes.array.isRequired,
        column:PropTypes.array,
        rowKey:PropTypes.string,
    }
    static defaultProps={
        column:[],
        rowKey:'id'
    }
    // state={}
    // this.show()->List.show()
    //ES6仅支持静态方法，不支持静态属性
    static show(){
    }
    render(){
        const {datasource,column,rowKey}=this.props
        return(
            <table className="table table-striped ">
                <thead>
                    <tr>
                        {
                            column.map((item,idx)=>{
                                return <th key={idx}>{item.label}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        datasource.map((row,index)=>{
                            return <tr key={row[rowKey]}>
                                {
                                    column.map(item=>{
                                        return <td key={item.label}>{
                                            typeof item.render==='function'?item.render(row,index):row[item.dataKey]
                                            }
                                            </td>
                                    })
                                }
                            </tr>
                        })
                    }

                </tbody>
            </table>
        )
    }
}
//props类型校验
// List.PropTypes={
//     datasource:PropTypes.array.isRequired,
//     // datasource:PropTypes.oneOfType([
//     //     PropTypes.array,
//     //     PropTypes.object
//     // ]),
//     num:function(props,propName,comName){
//         const value=props[propName]
//         if(value<10||value>20){
//             return new Error('num值必须在10~20之间')
//         }
//     }
// }
// // props默认值
// List.defaultProps = {
//     // datasource:[]
// }

export default List;