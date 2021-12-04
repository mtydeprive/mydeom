import React from 'react'
import classNames from 'classnames';

function Button({className,children,onClick}){
    // React.Children
    // console.log('count',React.Children.count(children),children)
    // React.Children.forEach(children,(child,idx)=>{
    //     console.log('foreach',child,idx)
    // })
    // console.log('only',React.Children.only());

    const data = 100;
    return (
        // <button className={classNames('btn',className)}>{children}</button>
        <button className={classNames('btn',className)} onClick={onClick}>{
            typeof children==='function' ? 
            children(data)
            :
            children
        }</button>
    )
}

export default Button;