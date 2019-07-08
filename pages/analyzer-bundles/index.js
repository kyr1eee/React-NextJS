import React from 'react';
import Link from 'next/link';

class Index extends React.Component {
    static async getInitialProps({ req }) {
        if(req) {
            return { name: '服务端'}
        }
        return { name: '客户端' }
    }

    render() {
        const { name } = this.props;
        return (
            <div>
                <h1>Welcome to Home Page</h1>
                <p>现在在{ name }</p>
                <Link href="/analyzer-bundles/about">
                    <a>Go to About Page</a>
                </Link>
            </div>
        )
    }
}

export default Index;

// next.config.js
/*
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFileName: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFileName: '../bundles/clinet.html'
    }
  },
  webpack(config) {
    return config
  }
};

module.export = withBundleAnalyzer(nextConfig);
 */