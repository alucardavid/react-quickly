class Button extends React.Component {
  render() {
    return <button className={this.props.className} >{this.props.buttonLabel}</button>
  }
}
Button.defaultProps = {buttonLabel: 'Submit', className: 'btn'}