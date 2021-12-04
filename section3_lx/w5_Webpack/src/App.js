import React from 'react'
import './App.scss'

// 以下图片被webpack处理
import g2 from './assets/img/g2.jpg' 
import home from './assets/img/home.svg'
const g4 = require('./assets/img/g4.jpg');
console.log('g4,home',g4,home)


function App(){
    return (
        // React.createElement('div',null,'App')
        <div>
            App
            <img src="./assets/img/g1.jpg" />

            {/* 以下地址路径错误 */}
            {/* <img src="./assets/img/g2.jpg" /> */}

            <img src={g2} />

            <img src={require('./assets/img/g4.jpg').default} />

            <img src={home} />
        </div>
    )
}

export default App
