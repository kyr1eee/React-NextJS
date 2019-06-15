import Head from 'next/head';
// head元素不能位于div内,因此需要内置Head组件
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