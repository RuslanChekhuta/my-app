import { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "Guest", age: 25 };
  }

  updateName = (name) => {
    this.setState({ name: name });
  };

  incrementAge = () => {
    this.setState((prevAge) => ({ age: prevAge.age + 1 }));
  };

  render() {
    return (
      <div className="card">
        <h3>Task 4: State Merging</h3>
        <p>
          Name: {this.state.name}, Age: {this.state.age}
        </p>
        <button className="btn" onClick={() => this.updateName("Alice")}>
          Set Name to Alice
        </button>
        <button className="btn" onClick={this.incrementAge}>
          Birthday (+1)
        </button>
      </div>
    );
  }
}
