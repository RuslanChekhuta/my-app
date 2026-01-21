import { Component } from "react";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], inputValue: "" };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddTask = () => {
    const { inputValue, tasks } = this.state;

    if (inputValue.trim()) {
      this.setState({
        tasks: [...tasks, inputValue],
        inputValue: "",
      });
    }
  };

  render() {
    return (
      <div className="task-list">
        <h2>Список задач</h2>
        <input
          value={this.state.inputValue}
          onChange={(e) => this.handleInputChange(e)}
          placeholder="Введите задачу..."
        />
        <button onClick={() => this.handleAddTask()}>Добавить</button>
        <ul>
          {this.state.tasks.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    );
  }
}
