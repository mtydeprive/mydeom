import React from 'react'
import { Redirect, useHistory,withRouter } from 'react-router'
import request from './request'

// @高阶组件应用：属性代理
// 获取用户数据
export function withUser(InnerComponent) {
    return function OuterComponent(props) {
        console.log('OuterComonent.props', props)
        let userInfo = localStorage.getItem('userInfo')
        try {
            userInfo = JSON.parse(userInfo) || {}
        } catch (err) {
            userInfo = {}
        }
        return (
            <InnerComponent userInfo={userInfo} {...props}></InnerComponent>
        )
    }
}

// 可以获取任意本地存储数据
export function withStorage(key) {
    return function HOC(InnerComponent) {
        return function OuterComonent(props) {
            let value = localStorage.getItem(key)
            try {
                value = JSON.parse(value)
            } catch (err) {
                value = value
            }

            const data = {}
            data[key] = value;

            return (
                <InnerComponent {...props} {...data}></InnerComponent>
            )
        }
    }
}

// 增强版withStorage
export function withStorages(...keys) {
    return function HOC(InnerComponent) {
        return function OuterComponent({ children, ...props }) {
            // 用户存放本地存储数据
            const data = {}
            keys.forEach(key => {
                let value = localStorage.getItem(key)
                try {
                    value = JSON.parse(value)
                } catch (err) {
                    value = value
                }

                // 每一个数据写入data对象
                data[key] = value;
            })


            return (
                <InnerComponent {...props} {...data}>{children}</InnerComponent>
            )
        }
    }
}
// withStorages('userInfo','token','cartlist')(Home)


// @高阶组件应用：提取公共代码
// 利用高阶组件withLogin实现页面登录访问权限
export function withLogin(InnerComponent) {
    function OuterComponent({ userInfo, ...props }) {
        const history = useHistory()
        const isLogin = !!userInfo.Authorization;

        // 发起ajax请求，校验token
        request.get('/user/verify').then(({ data }) => {
            if (data.status === 401) {
                history.push('/login')
            }
        })

        if (isLogin) {
            return <InnerComponent {...props}></InnerComponent>
        } else {
            return <Redirect to="/login" />
        }
    }

    OuterComponent = withUser(OuterComponent)

    return OuterComponent
}

// @高阶组件应用：反向继承（只适用于类组件）
// 利用高阶组件withAuth实现页面登录访问权限
export function withAuth(InnerComponent) {
    @withUser
    @withRouter
    class OuterComponent extends InnerComponent {
        state = {
            isLogin: !!this.props.userInfo.Authorization
        }
        componentDidMount() {
            console.log('withAuth.componentDidMount')
            const { history } = this.props;
            const {isLogin} = this.state;
            if (isLogin) {
                request.get('/user/verify').then(({ data }) => {
                    if (data.status === 401) {
                        history.push('/login')
                    }
                })
            }
            super.componentDidMount()
        }
        render() {
            const { isLogin } = this.state;
            console.log('withAuth.render',isLogin)
            if (isLogin) {
                return super.render()
            } else {
                return <Redirect to="/login" />
            }
        }
    }

    // OuterComponent = withUser(OuterComponent)
    // OuterComponent = withRouter(OuterComponent)

    return OuterComponent
}

// withAuth(Home)