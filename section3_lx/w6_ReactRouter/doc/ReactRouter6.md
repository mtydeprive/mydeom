# React Router
React应用的路由解决方案，实现单页面多视图的应用，目前最新版`6.x`，相比之前的`4.x`与`5.x`有较大改变，要求react>=16.8

## 安装
开发web应用，需要安装 `react-router`与`react-router-dom`两个模块

```bash
    npm install react-router-dom
```
> 安装react-router-dom，react-router会作为依赖自动安装

## 路由配置
* 路由类型
    * BrowserRouter
        > 使用HTML5新特性`pushState()`和`replaceState()`事件构建路由，让地址更像传统页面，但需要服务器的支持
    * HashRouter
        > 利用hash来实现路由，使用`window.location.hash`和`hashchange`事件构建路由，特点是浏览器地址栏带有`#`
* 路由匹配
    * Routes
        > 与`5.x`的`<Switch>`组件一至，使用前必须先指定路由类型
    * Route
        * path
        * element
            > 当浏览器地址匹配path时，渲染element对应的组件
        * index
            > 默认路由，不能与path一起使用
* 路由跳转
    * `<Link/>`
        * to
        * replace
    * `<NavLink/>`
        ```js
            <NavLink
                to="messages"
                style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }
            >
                Messages
            </NavLink>
            <NavLink
                to="tasks"
                className={({ isActive }) =>[isActive ? activeClassName : null]}
            >
                Tasks
            </NavLink>
        ```
    * Hook: `useNavigate()`
        ```js
            import { useNavigate } from "react-router-dom";
            let navigate = useNavigate();
            navigate(`/home`);
            navigate(`/home`,{replace:true});
        ```
    * 重定向: `<Navigate/>`
        > react-router@6删除了5.x中的`<Redirect/>`组件，可以使用该组件实现重定向效果
        * to
        * replace
        ```jsx
            <Route path="/" element={<Navigate to="/home" />}/>
        ```
* 嵌套路由（子路由）
    * 常规用法
        ```jsx
            <Routes>
                // /goods -> Goods
                <Route path="goods" element={<Goods />}>
                    // /goods/123 -> <Goods><Detail/></Goods>
                    <Route path=":id" element={<Detail />} />
                    // /goods/list -> <Goods><List/></Goods>
                    <Route path="list" element={<List />} />
                </Route>
            </Routes>
        ```
    * `<Outlet/>`
        > 子路由对应组件会显示到Outlet所在的位置
        ```jsx
            <Routes>
                // /goods -> Goods
                <Route path="goods" element={<Goods />}>
                    <Route path=":id" element={<Detail />} />
                    <Route path="list" element={<List />} />
                </Route>
            </Routes>

            // Goods.jsx
            function Goods() {
                return (
                    <div>
                        <h1>Goods</h1>
                        // /goods/123 -> <Goods><Detail/></Goods>
                        // /goods/list -> <Goods><List/></Goods>
                        <Outlet />
                    </div>
                );
            }
        ```

* 404页面
    ```jsx
        <Route path="*" element={<NotFound/>} />
    ```

* Hooks
    * useRoutes
        > 使用js对象方式配置路由，达到`<Route/>`组件的效果，返回路由树组成的虚拟节点
    * useParams
    * useSearchParams
    * useLocation