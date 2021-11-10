// 一个文件就是一个模块，且存在一个模块对象
// 导出：模块中的数据只有导出才能在外部使用

// 导出方式一：给模块对象添加username属性
export var username = 'laoma'
export let age = 18;
export function setAge(newValue){
    age = newValue;
    console.log('age=',age)
}   

// 导出方式二：给模块对象添加默认属性，值为score对象
const score = {chinese:110,math:100,english:1}
export default score


// 导出方式三：给模块对象批量添加属性
const a=10;
const b=20;
const c=30;
export {
    a as apple,
    b,
    c,
}

// 以下代码有何不同
// export {a,b,c}
// export default {a,b,c}

// html
// <script src="./module/user.js"></script>