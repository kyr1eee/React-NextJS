import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
const data = [
    {
        id: 10086,
        name: "LOL"
    },
    {
        id: 655,
        name: "Girl"
    }
];

// 报错：只能在客户端使用
// Router.beforePopState(({ url, as, options }) => {
//     if(url !== '/') {
//         window.location.href = as;
//         alert('不是主页');
//         return false;
//     }
//     return true;
// });

const TestLink = ({data}) => (
    <div>
        {/* Link标签必须包含唯一根元素,否则报错 */}
        <Link as={`/router/test/${data.id}`} href={`/router/test?q=${data.name}`}>
            <a>Link to { data.name } Page</a>
        </Link>
    </div>
);

const OtherLink = ({data}) => (
    <div>
        {/* replace作用是替换浏览器历史堆栈中栈顶的URL,Link组件默认行为是入栈 */}
        <Link href={`/router/other?title=${data.name}`} replace>
            <a>Other Link to { data.name } Page</a>
        </Link>
    </div>
);
const Index = () => (
    <div>
        <Link as="/head/666" href="/head">
            <a>
                拦截popstate测试
            </a>
        </Link>
        <button onClick={() => Router.push('/css')}>路由跳转</button>
        <button onClick={() => Router.push({
            pathname: '/router/other',
            query: { title: 'sleepyyyyyyyyyy' }
        })}>
            路由传参跳转
        </button>
        <Link href="/">
            <img src="static/jojo.png" />
        </Link>
        { data.map(item => (
            <TestLink key={item.id} data={item} />
        )) }
        { data.map(item => (
            <OtherLink key={item.id} data={item} />
        )) }
    </div>
);

export default Index;