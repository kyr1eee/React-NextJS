import Link from 'next/link';
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
        { data.map(item => (
            <TestLink key={item.id} data={item} />
        )) }
        { data.map(item => (
            <OtherLink key={item.id} data={item} />
        )) }
    </div>
);

export default Index;