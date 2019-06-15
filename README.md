# React-NextJS
Next.js是一个流行的轻量级框架，用于使用React构建的静态和服务器呈现的应用程序。它还提供样式和路由解决方案。
- 默认情况下，服务器呈现
- 自动代码拆分，加快页面加载速度
- 简单的客户端路由（基于页面）
- 支持基于Webpack的开发环境（HMR）
- 能够使用Express或任何其他Node.js HTTP服务器实现
- 可以使用您自己的Babel和Webpack配置进行定制
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
1. 子路由跳转,Link 和 Router
```
// index.js
// 子路由跳转
import Link from 'next/link';
const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
```
```
import Router from 'next/router';
<button onClick={() => Router.push('/css')}>路由跳转</button>
```
- 传参跳转
```
<button onClick={() => Router.push({
    pathname: '/router/other',
    query: { title: 'sleepyyyyyyyyyy' }
})}>
```
2. 获取路由参数,withRouter 和 getInitialProps
- withRouter 高阶组件
```
// post.js
// withRouter获取路由参数, props.router.query
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

-----------------------------------
// 高阶组件
import { withRouter } from 'next/router'
// 注入router对象
const ActiveLink = ({ children, router, href }) => {
  const style = {
    marginRight: 10,
    // 判断当前url是否为该路由组件
    color: router.pathname === href ? 'red' : 'black'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
export default withRouter(ActiveLink)
```
```
import React from 'react';
class Test extends React.Component {
    static async getInitialProps({ query }) {
        const { q } = query;
        return { q };
    }

    render() {
        return (
            <div>
                This is { this.props.q } page
            </div>
        )
    }
}
export default Test;
```
3. as属性改变URL显式方式
```
const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
```
4. 子路由刷新问题  
如果Link标签使用了as属性,刷新的时候将出错,此时后端 node.js 解决
```
// index.js
<Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
  <a>{props.title}</a>
</Link>
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
    // 子路由只能获取as属性的参数,无法获取title,此时无法显示title内容
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
5. replace属性  
replace作用是替换浏览器历史堆栈中栈顶的URL,Link组件默认行为是入栈
```
const OtherLink = ({data}) => (
  <div>
      {/* replace作用是替换浏览器历史堆栈中栈顶的URL,Link组件默认行为是入栈 */}
      <Link href={`/router/other?title=${data.name}`} replace>
          <a>Other Link to { data.name } Page</a>
      </Link>
  </div>
);
```
6. Link组件href属性可用对象赋值
```
<Link href={{ pathname: '/about', query: { name: 'Zeit' } }}>
  <a>here</a>
</Link>
```
7. 拦截popstate事件, Router.beforePopState
popstate: 浏览器历史堆栈发生改变时触发的事件
beforePopState: 返回false将不处理popstate事件。返回true处理popstate事件
```
Router.beforePopState(({ url, as, options }) => {
    if(url !== '/') {
        window.location.href = as;
        alert('不是主页');
        return false;
    }
    return true;
});
```
8. 路由事件, Router.events
- routeChangeStart(url) - Fires when a route starts to change
- routeChangeComplete(url) - Fires when a route changed completely
- routeChangeError(err, url) - Fires when there's an error when changing routes
- beforeHistoryChange(url) - Fires just before changing the browser's history
- hashChangeStart(url) - Fires when the hash will change but not the page
- hashChangeComplete(url) - Fires when the hash has changed but not the page
```
const handleRouteChange = url => {
  console.log('App is changing to: ', url);
};
// 监听
Router.events.on('routeChangeStart', handleRouteChange);
// 取消监听
Router.events.off('routeChangeStart', handleRouteChange);
```
9. 浅路由 shallow routing
- 跳转路由时不触发getInitialProps, 通过withRouter获取路由对象
- 相同页面URL改变才能使用,当跳转到新的页面,原先页面会卸载然后新页面触发getInitialProps
```
// Success
// Current URL is "/"
const href = '/?counter=10';
const as = '/';
Router.push(href, as, { shallow: true });

// Failed
const href = '/?counter=10';
const as = '/about?counter=10';
Router.push(href, as, { shallow: true });
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
                Hello World {this.props.userAgent}
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
