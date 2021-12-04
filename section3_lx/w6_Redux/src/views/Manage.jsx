import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { withAuth, withLogin, withStorage, withStorages, withRedux, withReduxPlus } from '../utils/hoc'
import { Layout, Menu, Breadcrumb, Row, Col, Button, message } from 'antd';
import { QqOutlined, HomeOutlined, ReadOutlined, TeamOutlined, BankOutlined, ToolOutlined, UnorderedListOutlined, DiffOutlined, IdcardOutlined, UnlockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import userAction from '../store/actions/user'
import style from './Manage.module.scss'
import Home from './manage/Home';
import User from './manage/User';
import Interview from './manage/Interview';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const mapStateToProps = function (state,owProps) {
    // state:redux的state
    // ownProps：组件本身的props
    console.log('owProps',owProps);
    return {
        userInfo: state.user.userInfo,
    }
}
//映射修改数据方法
const mapDispatchToProps=function(dispatch){
    return {
        logout(){
            // dispatch({type:'logout'})
            dispatch(userAction.logout())
            message.success('已成功退出')
        },
        // login(userInfo){
        //     dispatch({type:'login',payload:userInfo})
        // }
    }
}
@connect(mapStateToProps,mapDispatchToProps)
// @withReduxPlus(mapStateToProps, mapDispatchToProps)
@withLogin
class Manage extends React.Component {
    state = {
        menu: [
            {
                path: '/home',
                text: '首页',
                icon: <HomeOutlined />
            },
            {
                path: '/interview',
                text: '面试题管理',
                icon: <ReadOutlined />,
                children: [
                    {
                        path: '/list',
                        text: '面试题列表',
                        icon: <UnorderedListOutlined />,
                    },
                    {
                        path: '/add',
                        text: '添加面试题',
                        icon: <DiffOutlined />
                    },
                ]
            },
            {
                path: '/user',
                text: '用户管理',
                icon: <TeamOutlined />,
                children: [
                    {
                        path: '/list',
                        text: '用户列表',
                        icon: <UnorderedListOutlined />,
                    },
                    {
                        path: '/add',
                        text: '添加用户',
                        icon: <DiffOutlined />
                    },
                ]
            },
            {
                path: '/company',
                text: '企业管理',
                icon: <BankOutlined />,
                children: [
                    {
                        path: '/list',
                        text: '企业列表',
                        icon: <UnorderedListOutlined />,
                    },
                    {
                        path: '/add',
                        text: '添加企业',
                        icon: <DiffOutlined />
                    },
                ]
            },
            {
                path: '/pomission',
                text: '权限管理',
                icon: <UnlockOutlined />,

                children: [
                    {
                        path: '/role',
                        text: '角色管理',
                        icon: <IdcardOutlined />
                    },
                    {
                        path: '/set',
                        text: '权限指派',
                        icon: <ToolOutlined />,
                    },
                ]
            },
        ]
    }
    componentDidMount() {
        console.log('Manage.componentDidMount', this.props)

    }
    changeMenu = ({ item, key, keyPath, domEvent }) => {
        // console.log({ item, key, keyPath, domEvent });
        this.props.history.push(key)
    }
    // logout = () => {
    //     this.props.dispatch({ type: 'logout' })
    //     // this.props.history.push('/login')
    //     message.success('已成功退出')
    // }
    render() {
        console.log('Manage.render',this.props)
        const { match, userInfo,logout} = this.props
        const { menu } = this.state;
        return (
            <Layout style={{ height: '100%' }}>
                <Header className={style.header}>
                    <Row>
                        <Col span={12}>
                            <div className={style.logo} >
                                <QqOutlined className={style.icon} />
                                面试题后台管理系统
                            </div>
                        </Col>
                        <Col span={12} className="text-right">
                            {userInfo.username}<Button type="link" onClick={logout}>退出</Button>
                        </Col>
                    </Row>

                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[match.path + '/home']}
                            defaultOpenKeys={[match.path + '/interview']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.changeMenu}
                        >
                            {
                                menu.map(item => {
                                    if (item.children) {
                                        return <SubMenu key={match.path + item.path} icon={item.icon} title={item.text}>
                                            {
                                                item.children.map(it => {
                                                    return <Menu.Item key={match.path + item.path + it.path} icon={it.icon}>{it.text}</Menu.Item>

                                                })
                                            }
                                        </SubMenu>
                                    } else {

                                        return <Menu.Item key={match.path + item.path} icon={item.icon}>{item.text}</Menu.Item>
                                    }
                                })
                            }

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Route path={match.path + "/home"} component={Home} />
                            <Route path={match.path + "/interview"} component={Interview} />
                            <Route path={match.path + "/user"} component={User} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}


export default Manage