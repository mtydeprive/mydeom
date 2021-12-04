import React from "react";
// import request from '@/utils/request'
// import {Form,Input,Checkbox,Button,message,Rate,Switch,InputNumber} from 'antd'
// import {PlusCircleOutlined,DeleteOutlined} from '@ant-design/icons';
import MyForm from './Form'
class Add extends React.Component{
    // state={
    //     data:{},
    //     userInfo:JSON.parse(localStorage.getItem('userInfo')),
    //     initialValues:{
    //         difficulty:2,
    //         hot:100,
    //        checked:false
    //     },
    // }
    // getData= async()=>{
        // const {id}=this.props.match.params;
        // const {data}=await request.get('iq/'+id)
        // console.log('data',data);
        // this.setState({
        //     data:data.data,
        // })

        // //把数据写入表单
        // this.form.setFieldsValue(this.state.userInfo)
    // }
    // onFinish=async({_id,...values})=>{
    //     const userInfo=this.state.userInfo
    //     // console.log('userInfo',userInfo);
    //     console.log('values',_id,values);
    //     // const {data}=await request.post('/iq/',values)
        
    //     // console.log('data',data);
    //     // if(data.status===200){
    //     //     message.success('添加成功')
    //     //     this.props.history.push('/manage/interview/list')
    //     // }
    //     const {data}=await request.post('/iq/',{
    //         userid:userInfo._id,
    //         ...values,
    //     }
        // )
        // console.log('data',data);
        // if(data.status===200){
        //     message.success('添加成功')
        //     this.props.history.push('/manage/interview/list')
        // }
      
    // }
    // componentDidMount(){
    //     // this.getData()
    // }
    render(){
        // const {initialValues}=this.state
            return(
                <div>
                <MyForm/>
                {/* <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            initialValues={initialValues}
            onFinish={onFinish}
            autoComplete="off"
            ref={el=>this.form=el}
        >
            <Form.Item
                name="_id"
                hidden
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="面试题"
                name="question"
                rules={[{ required: true, message: '请填写面试题' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="难度"
                name="difficulty"
            >
                <Rate  />
            </Form.Item>
            <Form.Item
                label="热度"
                name="hot"
            >
                  <InputNumber  style={{width:100}}/>
            </Form.Item>

            <Form.Item label="审核" name="checked" valuePropName="checked" >
                <Switch />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                <Button size='large' type="primary" htmlType="submit">
                    确认
                </Button>
            </Form.Item>
        </Form> */}
                </div>
            )
    
    }
}
export default Add;
