import { Component } from "react";
import ChildComponent from "./ChildComponent";

export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { counters: [0, 0, 0] };
  }

  handleIncrement = (index) => {
    const newCounters = [...this.state.counters];
    newCounters[index] += 1;
    this.setState({ counters: newCounters });
  };

  render() {
    return (
      <div className="card">
        <h3>Task 5: Lifting State Up</h3>
        <div className="row">
          {this.state.counters.map((counter, index) => (
            <ChildComponent
              key={index}
              id={index}
              value={counter}
              onIncrement={() => this.handleIncrement(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
