import Link from './Link';
const Nav = () => (
    <nav>
        <style jsx>
        {`
            .active:after {
                content: ' (this is current page)';
            }

            .nav-link {
                text-decoration: none;
                padding: 10px;
                display: block;
            }
        
        `}
        </style>

        <ul>
            <li>
                <Link href="/active-className" activeClassName="active">
                    <a className="nav-link">Home Page</a>
                </Link>
                <Link href="/active-className/about" activeClassName="active">
                    <a className="nav-link">About Page</a>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Nav;