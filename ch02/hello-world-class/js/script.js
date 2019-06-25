
let h1 = React.createElement('h1', null, 'Hello world!')

class HelloWorld extends React.Component {
    render() {
        return React.createElement(
            'h1', 
            this.props, 
            `Hello ${this.props.frameworkName} World!!!`
        )
    }
}

