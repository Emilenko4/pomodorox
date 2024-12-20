import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const SESSION = "Session";
const BREAK = "Break";
const SESSIONLEN = 25;
const BREAKLEN = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLen: BREAKLEN,
      sessionLen: SESSIONLEN,
      timeLeft: SESSIONLEN * 60,
      timerType: SESSION,
      isTimerRunning: false,
      intervalId: "",
    };

    this.changeTimerType = this.changeTimerType.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStartStopTimer = this.toggleStartStopTimer.bind(this);
  }

  changeTimerType() {
    this.setState(
      {
        timerType: this.state.timerType === SESSION ? BREAK : SESSION,
        timeLeft:
          this.state.timerType === SESSION
            ? this.state.breakLen * 60
            : this.state.sessionLen * 60,
      },
      () => {
        this.runTimer();
      }
    );
  }

  handleDecrementBreak() {
    if (!this.state.isTimerRunning && this.state.breakLen > 1) {
      this.setState({
        breakLen: this.state.breakLen - 1,
        timeLeft:
          this.state.timerType === BREAK
            ? (this.state.breakLen - 1) * 60
            : this.state.timeLeft,
      });
    }
  }

  handleIncrementBreak() {
    if (!this.state.isTimerRunning && this.state.breakLen < 60) {
      this.setState({
        breakLen: this.state.breakLen + 1,
        timeLeft:
          this.state.timerType === BREAK
            ? (this.state.breakLen + 1) * 60
            : this.state.timeLeft,
      });
    }
  }

  handleDecrementSession() {
    if (!this.state.isTimerRunning && this.state.sessionLen > 1) {
      this.setState({
        sessionLen: this.state.sessionLen - 1,
        timeLeft:
          this.state.timerType === SESSION
            ? (this.state.sessionLen - 1) * 60
            : this.state.timeLeft,
      });
    }
  }

  handleIncrementSession() {
    if (!this.state.isTimerRunning && this.state.sessionLen < 60) {
      this.setState({
        sessionLen: this.state.sessionLen + 1,
        timeLeft:
          this.state.timerType === SESSION
            ? (this.state.sessionLen + 1) * 60
            : this.state.timeLeft,
      });
    }
  }

  resetTimer() {
    clearInterval(this.state.intervalId);
    this.setState({
      breakLen: BREAKLEN,
      sessionLen: SESSIONLEN,
      timeLeft: SESSIONLEN * 60,
      timerType: SESSION,
      isTimerRunning: false,
      intervalId: "",
    });
  }

  runTimer() {
    let intervalId = setInterval(() => {
      this.setState(
        {
          timeLeft: this.state.timeLeft - 1,
        },
        () => {
          if (this.state.timeLeft === 0) {
            this.changeTimerType();
          }
        }
      );
    }, 1000);
    this.setState({
      intervalId,
    });
  }

  toggleStartStopTimer() {
    if (!this.state.isTimerRunning) {
      this.runTimer();
      this.setState({ isTimerRunning: true });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({
        isTimerRunning: false,
        intervalId: "",
      });
    }
  }

  clockify() {
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  render() {
    let stopStartTimer = this.state.isTimerRunning ? "fa fa-pause" : "fa fa-play";

    return (
      <div className="clock-container fade">
        <div id="time-left" className="fade">{this.clockify()}</div>
        <div id="timer-label" className="hover">{this.state.timerType}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
