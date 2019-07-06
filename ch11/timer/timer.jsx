class TimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {timeLeft: null, timer: null}
        this.startTimer = this.startTimer.bind(this)
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            let timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) clearInterval(timer)
            this.setState({timeLeft: timeLeft})
        }, 1000)

        return this.setState({timeLeft: timeLeft, timer: timer})
    }

    render() {
        return (
            <div className="row-fluid">
                <h2>Timer</h2>
                <div className="btn-group" role="group">
                    <button type="button" className="btn-default btn" onClick={() => {this.props.startTimer(this.props.time)}} />
                    <button time="10" startTimer={this.startTimer} />
                    <button time="15" startTimer={this.startTimer} />
                </div>
                <Timer timeLeft={this.state.timeLeft}/>
                <audio id="end-of-time" src="flute_c_long_01.wav" preload="auto"></audio>
            </div>
        )
    }
}

class Timer extends React.Component {
    render() {
        if (this.props.timeLeft == 0) {
            document.getElementById('end-of-time').play()
        }
        if (this.props.timeLeft == null || this.props.timeLeft == 0) {
            return <div/>
        }
        return <h1>Time left: {this.props.timeLeft}</h1>
    }
}

class Button extends React.Component {
    startTimer(event) {
        
    }

    render() {

    }
}

ReactDOM.render(
    <TimerWrapper/>,
    document.getElementById('timer-app')
)