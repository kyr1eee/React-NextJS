# React-NextJS
Next.js是一个流行的轻量级框架，用于使用React构建的静态和服务器呈现的应用程序。它还提供样式和路由解决方案。
- 默认情况下，服务器呈现
- 自动代码拆分，加快页面加载速度
- 简单的客户端路由（基于页面）
- 支持基于Webpack的开发环境（HMR）
- 能够使用Express或任何其他Node.js HTTP服务器实现
- 可以使用您自己的Babel和Webpack配置进行定制
<!-- vscode-markdown-toc -->
* 1. [路由](#)
* 2. [动态路由](#-1)
* 3. [共享组件](#-1)
* 4. [请求数据 getInitialProps](#getInitialProps)
* 5. [styled-jsx 样式](#styled-jsx)
* 6. [静态文件服务](#-1)
* 7. [内置Head组件](#Head)
* 8. [动态加载](#-1)
* 9. [自定义app出口文件](#app)
* 10. [自定义document](#document)
* 11. [自定义错误处理](#-1)
* 12. [自定义配置](#-1)
		* 12.1. [自定义构建目录](#-1)
		* 12.2. [禁止etag生成](#etag)
		* 12.3. [控制服务器部署与缓存页面](#-1)
		* 12.4. [扩展解析后缀名](#-1)
		* 12.5. [配置构建ID](#ID)
		* 12.6. [跨平台设置NODE_ENV](#NODE_ENV)
		* 12.7. [Analyzer Bundles](#AnalyzerBundles)
* 13. [自定义字符集](#-1)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
##  1. <a name=''></a>路由
- client-side navigation 路由导航,无须通过请求服务器来跳转
- router实例只能在客户端使用,服务端渲染期间使用将报错
- Link 为高阶组件
- Link 的子组件唯一的要求是 onClick 属性可用
```
<Link href="/about">
    <a title="About">About Page</a>
</Link>
```
##  2. <a name='-1'></a>动态路由
- Link
- Router
- withRouter
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
传参跳转
```
<button onClick={() => Router.push({
    pathname: '/router/other',
    query: { title: 'sleepyyyyyyyyyy' }
})}>
```
2. 获取路由参数,withRouter 和 getInitialProps  
withRouter 高阶组件  
withRouter注入的router对象与来自'next/router'的Router相似
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
routeChangeStart(url) - Fires when a route starts to change  
routeChangeComplete(url) - Fires when a route changed completely  
routeChangeError(err, url) - Fires when there's an error when changing routes  
beforeHistoryChange(url) - Fires just before changing the browser's history  
hashChangeStart(url) - Fires when the hash will change but not the page  
hashChangeComplete(url) - Fires when the hash has changed but not the page
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
跳转路由时不触发getInitialProps, 通过withRouter获取路由对象  
相同页面URL改变才能使用,当跳转到新的页面,原先页面会卸载然后新页面触发getInitialProps
```
// Success
// Current URL is "/"
function A({...}) {
  ...
  const href = '/?counter=10';
  const as = '/';
  Router.push(href, as, { shallow: true });
  ...
  return (
    <div>
      { router.query.counter }
    </div>
  )
}
export default withRouter(A)


// Failed
const href = '/?counter=10';
const as = '/about?counter=10';
Router.push(href, as, { shallow: true });
```
10. 路由页面预加载, prefetch  
Link标签与router对象
```
// 方法1
<Link href="/router/prefetch" prefetch><a>预加载</a></Link>
// 方法2
// router实例只能在客户端使用,因此服务端渲染的时候需要在componentDidMount中使用router实例
class Index extends React.Component {
  componentDidMount() {
    const { router } = this.props;
    router.prefetch('/router/prefetch')
  }

  render() {
    return (
      <div>
        <button onClick={() => Router.push('/router/prefetch')}>另一种预加载页面</button>
      </div>
    )
  }
}
export default withRouter(Index);
```
11. 禁止文件路径导航
```
// next.config.js
module.export = {
  useFileSystemPublicRoutes: false
};
```
12. 自定义路由  
访问a页面,跳转至b页面.访问b页面,跳转至a页面
```
// server.js
const parsedUrl = parse(req.url, true);
const { pathname, query } = parsedUrl;
if(pathname === '/a')
  app.render(req, res, '/b', query);
else if(pathname === '/b)
  app.render(req, res, '/a', query);
else
  handle(req, res, parsedUrl);
```
##  3. <a name='-1'></a>共享组件
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
##  4. <a name='getInitialProps'></a>请求数据 getInitialProps
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
##  5. <a name='styled-jsx'></a>styled-jsx 样式
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
##  6. <a name='-1'></a>静态文件服务
- static目录存储,通过/static/filename获取
- public目录存储,通过根目录获取,即/filename(当前版本貌似已取消)

##  7. <a name='Head'></a>内置Head组件
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
##  8. <a name='-1'></a>动态加载
服务端动态导入
1. ssr
```
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(import("../components/hello"));

export default () => (
  <div>
    <Header />
    <DynamicComponent />
    <p>HOME PAGE is here!</p>
  </div>
);
```
2. 自定义加载组件
```
import dynamic from "next/dynamic";

const DynamicComponentWithCustomLoading = dynamic(
  import("../components/hello2"),
  {
    loading: () => <p>...</p>
  }
);

const DynamicComponentWithCustomLoading1 = dynamic(
  {
    // 待加载组件
    loader: () => import("../components/hello2"),
    // 加载组件
    loading: () => <p>...</p>
  }
);

const DynamicComponentWithCustomLoading2 = dynamic(
  {
    // 待加载组件
    loader: () => import("../components/hello2")
  }
);


export default () => (
  <div>
    <Header />
    <DynamicComponentWithCustomLoading />
    {showMore && <DynamicComponentWithCustomLoading2 />}
    <p>HOME PAGE is here!</p>
  </div>
);
```
3. 禁用SSR
```
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(import("../components/hello3"), {
  ssr: false
});

export default () => (
  <div>
    <Header />
    <DynamicComponentWithNoSSR />
    <p>HOME PAGE is here!</p>
  </div>
);
```
4. 同时加载多个组件
```
import dynamic from "next/dynamic";

const HelloBundle = dynamic({
  modules: () => {
    const components = {
      Hello1: import("../components/hello1"),
      Hello2: import("../components/hello2")
    };

    return components;
  },
  // 导入Hello1,2组件
  render: (props, { Hello1, Hello2 }) => (
    <div>
      <h1>{props.title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  )
});

export default () => <HelloBundle title="Dynamic Bundle" />;
```
##  9. <a name='app'></a>自定义app出口文件
- pages/_app.js
- 修改默认布局
- 自定义错误抓取ComponentDidCatch
- 注入额外数据

```
// pages/_app.js
// 修改默认布局

import React from 'react'
import App, { Container } from 'next/app'

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return <div className='layout'>{children}</div>
  }
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
```
```
// 自定义捕获错误
import App from 'next/app'

export default class MyApp extends App {
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}
```
##  10. <a name='document'></a>自定义document
1. next自动定义文档标记,通过pages/_document.js修改
2. 服务端呈现
3. 初始服务端时添加标记元素
4. 自定义renderPage
```
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```
```
// 定制“renderPage”的唯一原因是使用css-in-js库，需要将应用程序包装起来以正确使用服务端渲染。 
import Document from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: App => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: Component => Component
      })

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument

```
##  11. <a name='-1'></a>自定义错误处理
- pages/_error.js
- 404,500通过默认的error.js处理
- next/error组件渲染内置错误页面

```
import React from "react";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
}
```
```
// 自定义内置错误页面
import React from "react";
import Error from "next/error";
import fetch from "isomorphic-unfetch";

export default class Page extends React.Component {
  static async getInitialProps() {
    const res = await fetch("https://api.github.com/repos/zeit/next.js");
    const statusCode = res.statusCode > 200 ? res.statusCode : false;
    const json = await res.json();

    return { statusCode, stars: json.stargazers_count };
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />;
    }

    return <div>Next stars: {this.props.stars}</div>;
  }
}

```
##  12. <a name='-1'></a>自定义配置
- 根目录下的next.config.js文件.是node.js模块
- 应用于服务端渲染构建阶段.不作用于浏览器端.
```
// phase是配置文件被加载时的当前内容。所有的 phases 常量，constants 这些常量可以通过next/constants引入
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
```
####  12.1. <a name='-1'></a>自定义构建目录  
代替.next成为构建目录
```
// next.config.js
module.exports = {
  distDir: "build"
};
```
####  12.2. <a name='etag'></a>禁止etag生成  
每个页面默认生成etag
```
// next.config.js
module.exports = {
  generateEtags: false
};
```
####  12.3. <a name='-1'></a>控制服务器部署与缓存页面
```
// 开发环境使用
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2
  }
};
```
####  12.4. <a name='-1'></a>扩展解析后缀名
```
// next.config.js
module.exports = {
  pageExtensions: ["jsx", "js"]
};
```
####  12.5. <a name='ID'></a>配置构建ID  
生成常量标志应用服务的版本,防止多台服务器部署出错
```
// next.config.js
module.exports = {
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return "my-build-id";
  }
};
```
####  12.6. <a name='NODE_ENV'></a>跨平台设置NODE_ENV  
cross-env能跨平台设置NODE_ENV, 跨平台设置环境变量
```
npm install -D cross-env
```
```
// package.json
// cross-env转换为windows平台命令
scripts: {
  "analyze": "cross-env BUNDLE_ANALYZE=both next build"
}
```
####  12.7. <a name='AnalyzerBundles'></a>Analyzer Bundles  
next项目使用webpack-bundle-analyzer, 可视化资源分析
```
// npm install @zeit/next-bundle-analyzer
// next.config.js
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      // 显示可视化报告的页面
      reportFilename: '../bundles/server.html'
    },
    browser: {
      // 配置参数与webpack-bundle-analyzer一样
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack(config) {
    return config
  }
};

module.exports = withBundleAnalyzer(nextConfig);
```
```
// package.json
scripts: {
  "analyze" : "cross-env BUNDLE_ANALYZE=both next build",
  "analyze:server" : "cross-env BUNDLE_ANALYZE=server next build",
  "analyze:browser" : "cross-env BUNDLE_ANALYZE=browser next build"
}
```
##  13. <a name='-1'></a>自定义字符集
```
// server.js
res.setHeader('Content-Type', 'text/html; charset=iso-8859-2');
```