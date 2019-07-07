class TimerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timeLeft: null, timer: null, status: 'Pause' };
        this.startTimer = this.startTimer.bind(this);
        this.pauseResumeTimer = this.pauseResumeTimer.bind(this);
        this.cancelTimer = this.cancelTimer.bind(this);
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer);
        let timer = setInterval(() => {
            let timeLeft = this.state.timeLeft - 1;
            if (timeLeft == 0) clearInterval(timer);
            this.setState({ timeLeft: timeLeft });
        }, 1000);

        console.log(this.state.timer);
        return this.setState({ timeLeft: timeLeft, timer: timer, status: 'Pause' });
    }

    pauseResumeTimer() {
        if (this.state.status == "Pause") {
            clearInterval(this.state.timer);
            return this.setState({ status: 'Resume' });
        } else {
            this.startTimer(this.state.timeLeft);
        }
    }

    cancelTimer() {
        clearInterval(this.state.timer);
        return this.setState({ timeLeft: null });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'row-fluid' },
            React.createElement(
                'h2',
                null,
                'Timer'
            ),
            React.createElement(
                'div',
                { className: 'btn-group', role: 'group' },
                React.createElement(Button, { time: '5', startTimer: this.startTimer }),
                React.createElement(Button, { time: '10', startTimer: this.startTimer }),
                React.createElement(Button, { time: '15', startTimer: this.startTimer }),
                React.createElement(PauseResumeButton, { timer: !this.state.timeLeft > 0, action: this.state.status, pauseResumeTimer: this.pauseResumeTimer }),
                React.createElement(CancelButton, { timer: !this.state.timeLeft > 0, cancelTimer: this.cancelTimer })
            ),
            React.createElement(Timer, { timeLeft: this.state.timeLeft }),
            React.createElement('audio', { id: 'end-of-time', src: 'flute_c_long_01.wav', preload: 'auto' })
        );
    }
}

// class Timer extends React.Component {
//     render() {
//         if (this.props.timeLeft == 0) {
//             document.getElementById('end-of-time').play()
//         }
//         if (this.props.timeLeft == null || this.props.timeLeft == 0) {
//             return <div/>
//         }
//         return <h1>Time left: {this.props.timeLeft}</h1>
//     }
// }

const Timer = props => {
    if (props.timeLeft == 0) {
        document.getElementById('end-of-time').play();
    }
    if (props.timeLeft == null || props.timeLeft == 0) {
        return React.createElement('div', null);
    }
    return React.createElement(
        'h1',
        null,
        'Time left: ',
        props.timeLeft
    );
};

/** 
 * Button to Pause ou Resume Timer 
 * */
class PauseResumeButton extends React.Component {
    pauseResumeTimer(event) {
        return this.props.pauseResumeTimer();
    }

    render() {
        return React.createElement(
            'button',
            { type: 'button', disabled: this.props.timer, className: 'btn-warning btn', onClick: this.pauseResumeTimer.bind(this) },
            this.props.action
        );
    }
}

class CancelButton extends React.Component {
    cancelTimer() {
        return this.props.cancelTimer();
    }

    render() {
        return React.createElement(
            'button',
            { type: 'button', disabled: this.props.timer, className: 'btn-danger btn', onClick: this.cancelTimer.bind(this) },
            'Cancel'
        );
    }
}

class Button extends React.Component {
    startTimer(event) {
        return this.props.startTimer(this.props.time);
    }

    render() {
        return React.createElement(
            'button',
            { type: 'button', className: 'btn-default btn', onClick: this.startTimer.bind(this) },
            this.props.time,
            ' seconds'
        );
    }
}

ReactDOM.render(React.createElement(TimerWrapper, null), document.getElementById('timer-app'));
