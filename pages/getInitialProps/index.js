<!-- vscode-markdown-toc -->

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->// pathname - URL路径
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