import React from "react";
import request from '../utils/request'
import {Form,Input,Checkbox,Button,message} from 'antd'
// import store from "../redux";
import { withReduxPlus } from "../utils/hoc";
function Login(props) {
    const onFinish=function(values){
        console.log('values',values);

        request.get('/user/login',{
            params:values
        }).then(({data})=>{
            if(data.status===200){
                //登录成功后，修改redux数据
                // store.dispatch({type:'login',payload:data.data})
                props.login(data.data)
                props.history.push('/manage')
                message.success('登录成功')
            }else{
                message.error('用户名或密码错误')
            }
        })
    }
    return (
        <div className="login-from">
            <h1>面试题后台管理系统</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 12 }}>
                    <Checkbox>下次免登录</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
Login = withReduxPlus(null,(dispatch)=>{
    return {
        login(data){
            dispatch({type:'login',payload:data})
        }
    }
})(Login)
export default Login;