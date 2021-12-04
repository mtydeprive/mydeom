import React from "react";
import requset from '@/utils/request'
import {Table,Button,Row,Col,Popconfirm, message}  from 'antd'
import {PlusCircleOutlined,DeleteOutlined} from '@ant-design/icons';



class List extends React.Component {
    state={
        columns:[],
        data:[],
        total:0,
        page:1,
        size:10,
        selectIds:[],
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
        
    }
    getData= async()=>{
        const {page,size}=this.state;
        const {data}=await requset.get('iq',{
            params:{
                page,
                size,
            }
        })
        console.log('data',data);
        this.setState({
            data:data.data.result,
            total:data.data.total,
        })
      
    }
    goto = (url)=>{
        this.props.history.push({
            pathname:url,
            // search:'page=1&size=10',
            // state:{c:10,d:20},
            // 以下为自定义数据
            // username:'laoxie',
            // params:{a:100,b:200},
        })
    }
    gotoAdd=(url)=>{
        this.props.history.push(url)
    }
    componentDidMount(){
        this.getData()
    }
    removeItems=async()=>{
        const {selectIds}=this.state;
        if(selectIds.length===0){
            message.warning('请选择需要删除的数据')
            return;
        }
        const {data}=await requset.delete(`/iq`,{
          data:{
            ids:selectIds
           }
        })
        if(data.status===200){
            message.success('删除成功')

            //重新获取数据
            this.getData()
        }
    }
    removeItem=async(id)=>{
        const {data}=await requset.delete(`/iq/${id}`)
        if(data.status===200){
            message.success('删除成功')

            //手动删除本地数据
            // this.setState({
            //     data:this.state.data.filter(item=>item.id!==id)
            // })

            //重新获取数据
            this.getData()
        }
    }
    render() {
        console.log('List.props',this.props)
        const {data,total,size}=this.state;
        const pagination={
            size:"small",
            total,
            showTotal:(total)=>{
                return `共${total}条记录`
            },
            pageSize:size,
            showSizeChanger:true,
            onChange:(page,size)=>{
                this.setState({
                    page,size
                },()=>{
                    this.getData()
                })
            }
        }
        const rowSelection={
            onChange:(selectedRowKeys, selectedRows)=>{
                // selectedRowKeys:选中行对应的rowKey组成的数组
                // selectedRows：选中行对应的数据
                console.log(selectedRowKeys, selectedRows);
                this.setState({
                    selectIds:selectedRowKeys
                })
            }
        }
        const columns =[
            {
                title:'#',
                width:50,
                render(value,row,index){
                    //value:dataIndex对应的值,如不指定dataIndex，则与row一致
                    return index+1
                }
            },
            {
                title:'面试题',
                dataIndex:'question',
                render(value,row){
                    return <>
                        <h5>{row.question}</h5>
                        <div>{row.answer}回答  {row.hot}查看</div>
                    </>
                }
            },
            // {
            //     title:'是否审核',
            //     dataIndex:'checked',
            //     width:100,
            //     render(value,row){
            //         return <>
            //             <h5>{(value===false)?'未审核':'已审核'}</h5>
            //         </>
            //     }
            // },
            {
                title:'操作',
                width:160,
                render:(row)=>{
                    return <>
                         <Button type="primary" size="small" ghost onClick={this.goto.bind(this,`/manage/interview/edit/${row._id}`)}>编辑</Button>
                         <Popconfirm
                            title="确认删除？"
                            cancelText="取消"
                            okText="确认"
                            onConfirm={this.removeItem.bind(this,row._id)}
                        >
                              <Button size="small" danger >删除</Button>
                        </Popconfirm>
                      
                    </>
                }
            },
        ]
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Button type="primary" icon={<PlusCircleOutlined />} onClick={this.gotoAdd.bind(null,'/manage/interview/add')}>添加</Button>
                    </Col>
                    <Col span={12} className="text-right">
                    <Popconfirm
                            title="确认删除？"
                            cancelText="取消"
                            okText="确认"
                            onConfirm={this.removeItems}
                        >
                        <Button type="primary" icon={<DeleteOutlined /> } danger>批量删除</Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <Table 
                style={{marginTop:20}}
                rowKey="_id" 
                columns={columns} 
                dataSource={data} 
                rowSelection={rowSelection}
                pagination={pagination}
                />
            </div>
        )
    }
}

export default List;
