/**
 * ajax请求封装
    *注意事项
        1.不要把页面逻辑写入封装函数中，可以使用回调函数实现页面逻辑
 */
function request(url, callback, method = 'get') {
    //callback:回调函数
    //基础路径
    const baseUrl = 'http://120.76.247.5:2003/api'
    url = baseUrl + url

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        //页面业务逻辑
        const data = JSON.parse(xhr.responseText)

        //调用回调函数
        if (typeof callback === 'function') {
            callback(data)
        }
    }
    xhr.open(method, url, true);
    xhr.send();
}

//利用Promise封装ajax请求函数
function ajax(url, method = 'get') {
    //callback:回调函数
    //基础路径
    const baseUrl = 'http://120.76.247.5:2003/api'
    url = baseUrl + url

    const promise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            //页面业务逻辑
            const data = JSON.parse(xhr.responseText)  
                resolve(data)
        }
        xhr.open(method, url, true);
        xhr.send();
    })
    return promise;
}