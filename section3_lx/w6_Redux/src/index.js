import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter,BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const Router=process.env.NODE_ENV==='production'?BrowserRouter:HashRouter
import App from './App'

ReactDOM.render(
    // <context.Provider value=""></context.Provider>
    <Provider store={store}>
         <Router>
        <App/>
        {/* <Route path="/" component={App}/> */}
    </Router>
    </Provider>
   
    ,
    document.querySelector('#app')
)