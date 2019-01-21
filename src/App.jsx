import React, { Component } from 'react';

import './App.css';

import ToDoList from './components/TodoComponents/TodoList';
import SearchComponent from './components/TodoComponents/SearchComponent';

let generateId = Date.now();

const ToDoItems = [
  { task: 'finish building todo app', id: generateId, completed: true },
  { task: 'cook dinner', id: generateId + 1, completed: false },
  { task: 'clean kitchen', id: generateId + 2, completed: false },
  { task: 'buy a nintendo switch', id: generateId + 3, completed: false }
];

// set up search: value in state
// set up similar method to handle method, with .filter
// if there's a match, return filtered state

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: ToDoItems,
      shownList: ToDoItems,
      addingTask: '',
      id: '',
      completed: '',
      searchText: ''
    };
  }

  componentDidMount = () => {
    const storedList = JSON.parse(localStorage.getItem('list'));
    console.log(storedList);
    console.log(this.state.list);
    this.setState({ shownList: storedList });
  };

  componentDidUpdate = () => {
    localStorage.setItem('list', JSON.stringify(this.state.shownList));
    console.log('updated');
  };

  // filtering original data, returning matched data
  handleSearch = e => {
    const match = this.state.list.filter(item => {
      return item.task.includes(e.target.value);
    });
    this.setState({
      shownList: match
    });
  };

  // works if list is not filtered
  clearCompleted = () => {
    this.setState(previousState => {
      const clearedList = previousState.shownList.filter(
        toDoItem => !toDoItem.completed
      );
      return {
        shownList: clearedList
      };
    });
  };

  toggleCompleted = task => {
    this.setState(previousState => {
      const updatedList = previousState.shownList.map(toDoItem => {
        if (toDoItem.task === task) {
          toDoItem.completed = !toDoItem.completed;
        }
        return toDoItem;
      });
      return {
        shownList: updatedList
      };
    });
  };

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    this.setState({
      shownList: [
        ...this.state.shownList,
        { task: this.state.addingTask, id: Date.now(), completed: false }
      ],
      addingTask: ''
    });
  };

  render() {
    return (
      <div className="container">
        <h1>To Do App</h1>

        <ToDoList
          list={this.state.shownList}
          handleChanges={this.handleChanges}
          submitForm={this.submitForm}
          addingTask={this.state.addingTask}
          toggleCompleted={this.toggleCompleted}
          clearCompleted={this.clearCompleted}
        />
        {/* <SearchComponent handleSearch={this.handleSearch} /> */}
      </div>
    );
  }
}

export default App;
