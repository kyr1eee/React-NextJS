// client-side navigation 路由导航,无须通过请求服务器来跳转
// Link 为高阶组件,无title属性
// Link 的子组件唯一的要求是 onClick 属性可用
import Link from 'next/link';   
import Layout from '../components/MyLayout';
const Page = () => <p>Hello, Next</p>;
export default Layout(Page);