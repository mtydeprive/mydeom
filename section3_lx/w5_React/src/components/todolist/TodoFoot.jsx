import React from "react";
function TodoFoot({ datalist }) {
    const donelist = datalist.filter(item => item.done)
    const undonelist = datalist.filter(item => !item.done)
    return (
        <div className="p-3">
            总数：{datalist.length}，完成：{donelist.length}，未完成：{undonelist.length}
        </div>
    )
}

export default TodoFoot