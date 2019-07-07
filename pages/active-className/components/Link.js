import { withRouter } from 'next/router';
import Link from 'next/link';
import { Children } from 'react';
const ActiveLink = ({children, router, ...props}) => {
    // 验证children是否只有一个子节点，有则返回它，否则抛出错误
    const child = Children.only(children);
    let className = child.props.className || null;

    if(router.pathname === props.href && props.activeClassName) {
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;

    // 以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果
    return <Link {...props}>{ React.cloneElement(child, { className }) }</Link>
}

// 注入router参数
export default withRouter(ActiveLink);