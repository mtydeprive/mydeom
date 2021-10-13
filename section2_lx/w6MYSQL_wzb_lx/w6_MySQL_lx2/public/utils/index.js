//cookie操作：zengshangai
class Cookie {
    //初始化
    constructor() {
        //cookie->object
        const cookies = document.cookie.split('; '); //'usernmae=laoxie; password=123456'

        //{username='laoxie',password=123456}
        const data = {}
        cookies.forEach(item => {
            const [key, value] = item.split('=')
            data[key] = value;
        })
        this.data = data
    }
    //方法

    //获取cookie
    get(key) {
        return this.data[key]
    }

    //设置cookie
    set(key, value, options = {}) {
        this.data[key] = value;

        //处理参数
        const params = []; //['express=2021/10/1 00:00:00','path=/']
        for (let key in options) {
            params.push(`${key}=${options[key]}`)
        }

        document.cookie = `${key}=${value}` + (params.length > 0 ? `;` + params.join(';') : '')
    }

    //删除cookie
    remove(key) {

        const date = new Date()
        date.setDate(date.getDate() - 10)

        this.set(key, null, {
            expires: date
        })

        delete this.data[key];
    }

    //清空
    clear() {
        for (let key in this.data) {
            this.remove(key)
        }
    }
}

// const cookie=new Cookie()
// cookie.get('usernmae')
// cookie.set('usernmae','laoxie')//session
// cookie.set('usernmae','laoxie',{expires:'',path:'/'})//session
// cookie.remove('usernmae')
// cookie.clear()
// cookie.data.usernmae


/**
 * @节点操作：
    *获取
    *操作
    *事件绑定
    *... 
 */
class Query{
    constructor(selector){
        this.el=document.querySelectorAll(selector)
    }

    //事件绑定
    on(type,handle){
        this.el.forEach(item=>{
            item['on'+type]=handle
        })
    }

    //添加类名
    addClass(className){
        this.el.forEach(item=>{
            item.classList.add(className)
        })
    }
    removeClass(className){
        this.el.forEach(item=>{
            item.classList.remove(className)
        })
    }

    //添加很多节点操作方法
}
const $=function(selector){
    return new Query(selector)
}

// const btns=new Query('button')
// const btns=$('button')
// btns.on('click',function(){

// })

// btns.addClass('btn')