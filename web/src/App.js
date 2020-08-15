import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoLists from './components/TodoLists';

const Tasks = ({match}) => {
  return (
    <div>Tasks for list id: {match.params.todoListId}</div>
  )
}

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="todos-app">
          <TodoLists/>
          <div className="main">
            <Route path="/todos/:todoListId" component={Tasks}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
  