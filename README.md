# React-NextJS
## 路由
- client-side navigation 路由导航,无须通过请求服务器来跳转
- Link 为高阶组件
- Link 的子组件唯一的要求是 onClick 属性可用
```
<Link href="/about">
    <a title="About">About Page</a>
</Link>
```
## 动态路由
1. 子路由跳转
```
// index.js
// 子路由跳转
const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
----------------
// post.js
// 获取路由参数, props.router.query
// withRouter -> 向 props 注入 router 对象
import { withRouter } from 'next/router';
import Layout from '../components/MyLayout.js';

const Page = withRouter(props => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog post content.</p>
  </Layout>
));

export default Page;
```
2. as属性改变URL显式方式
```
const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
```
3. 子路由刷新问题
后端 node.js 解决
```
// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // 当刷新访问该URL的时候，渲染子路由
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { title: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```
## 共享组件
1. props.children
```
// MyLayout.js
const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);
---------------------

// index.js
const Index = () => (
    <Layout>
        <p>Hello Next.js</p>
    </Layout>
)
```
2. 高阶组件
```
// MyLayout.js
// 高阶组件返回值为 组件, 即函数组件或类组件
const Layout = page => {
    return () => (
        <div>
            <Header />
            <page />
        </div>
    );
}
---------------------

// index.js
const Index  = () => <p>Hello Next</p> ;
export default Layout(Index);
```
3. props传递
```
// MyLayout.js
const Layout = props => (
    <div>
        <Header />
        {props.content}
    </div>
)
---------------------

// index.js
const Page = () => <p>Hello,Next.JS</p>;
const Index = () => (
    <Layout content={page} />
)
```

