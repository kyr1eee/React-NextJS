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
## 请求数据 getInitialProps
- 页面加载的过程中异步抓取数据
- 返回值必须为纯对象
- 只可在pages目录下文件使用,不能在components使用
- 服务器渲染期间,返回值序列化,类似JSON.stringify
```
// pathname - URL路径
// query - URL查询对象
// asPath - 浏览器显示的实际路径(包括query参数)的字符串
// req - HTTP request object (server only)
// res - HTTP response object (server only)
// err - Error object if any error is encountered during the rendering
import React from 'react';
class Index extends React.Component {
    static async getInitialProps({ req, res, err, query, pathname, asPath}) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        console.log({ req, res, err, query, pathname, asPath});
        return { userAgent };
    }

    render() {
        return (
            <div>
                Hello World
            </div>
        )
    }
} 
export default Index;
```
```
// index.js
// 服务器请求数据
// 服务器渲染,因此服务器请求数据,无须客户端请求
Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};
------------

// post.js
// 客户端请求数据
// 因为通过客户端请求路由,因此通过客户端请求
Post.getInitialProps = async function(context) {
  // context.query 获取查询参数
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};
```
## styled-jsx 样式
- css in js, 每个 styled-jsx 组件都是单独的作用域, 不会影响其他组件, 同时对嵌套组件的元素也无效
- styled-jsx 通过 babel插件运行,它将解析所有CSS并在构建过程中应用
- 使用styled-jsx，所有必需的前缀和CSS验证都在babel插件中完成，因此没有额外的运行时开销
```
<style jsx>{`
  a {
    color: #fff;
  }

  h1 {
    background: #000;
  }

  a:hover {
    cursor: pointer;
  }

`}</style>
```
- 改变子组件内部样式, 通过global全局样式
```
<style jsx global>{`
  .markdown {
    ...
  }

  .markdown a {
    ...
  }

  .markdown h3 {
    ...
  }
`}</style>
```
## 静态文件服务
- static目录存储,通过/static/filename获取
- public目录存储,通过根目录获取,即/filename(当前版本貌似已取消)

## 内置Head组件
- head元素不能位于div内,因此需要内置Head组件
```
import Head from 'next/head';
const index = () => (
    <div>
        <Head>
            <meta name="viewport"
                  content="initial-scale=1.0, width=device-width"
                  key="viewport"></meta>
            <title>内置Head组件</title>
        </Head>
    </div>
)
export default index;
```
