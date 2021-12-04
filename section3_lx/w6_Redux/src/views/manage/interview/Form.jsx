import React from "react";
import request from '@/utils/request'
import {Form,Input,Checkbox,Button,message,Rate,Switch,InputNumber} from 'antd'
import { useHistory } from "react-router";
function InterviewFrom({data}){
    const history=useHistory()
    //在函数组件中使用useform()获取Form实例
    const [myform]=Form.useForm()
    const  initialValues={
        difficulty:2,
        hot:100,
        }
        const onFinish=async({_id,...values})=>{
            const userInfo=JSON.parse(localStorage.getItem('userInfo'))
            let data;
            if(_id){
                //编辑
                data=await request.patch('/iq/'+_id,values)
            }else{
                //添加
                data=await request.post('/iq/',{
                    userid:userInfo._id,
                    ...values,
                }
                )

            }
            console.log('data',data.data);
            if(data.data.status===200){
                message.success((_id?'修改':'添加')+'成功')
                history.push('/manage/interview/list')
            }
        }
        //ref对组件或节点的引入必须在页面渲染后才能获取到
        // const myform=React.createRef()
     
        // // 如为编辑状态，则需要把数据写入表单
        if(data){
            //ref写法
            //myform.current.setFieldsValue(data)
            //useform写法
            myform.setFieldsValue(data)
        }
        console.log('myform',myform);
        return(
         
               <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            initialValues={initialValues}
            onFinish={onFinish}
            autoComplete="off"
            // ref={myform}
            form={myform}
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
        </Form>
           
        )
}

export default InterviewFrom;