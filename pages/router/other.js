import { withRouter } from 'next/router';

export default withRouter(props => (
    <div>
        <h1>{props.router.query.title}</h1>
    </div>
))