import { Component } from "react";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  handleTripleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div className="card">
        <h3>Task 2: Counter</h3>
        <button className="btn" onClick={this.handleIncrement}>
          +1
        </button>
        <button className="btn" onClick={this.handleTripleIncrement}>
          +3
        </button>
        <p>Counter:{this.state.count}</p>
      </div>
    );
  }
}
