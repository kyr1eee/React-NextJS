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