const index = () => (
    <div>
        <h3>Hello World</h3>
        <p>with style</p>
        <style jsx>{`
            h3 {
                color: blue;
            }

            p {
                font-size: 50px;
                color: red;
            }

            p:hover {
                opacity: .6;
            }
        `}</style>
        <style jsx global>{`
            body {
                background: green;
            }
        `}</style>
    </div>
);

export default index;