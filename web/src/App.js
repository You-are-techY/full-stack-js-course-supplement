import React from 'react';
import './App.css';

import TodoLists from './components/TodoLists';

class App extends React.Component {

  render() {
    return (
      <div className="todos-app">
        <TodoLists/>
      </div>
    );
  }
}

export default App;
  