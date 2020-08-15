import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoLists from './components/TodoLists';
import Tasks from './components/Tasks';

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
  