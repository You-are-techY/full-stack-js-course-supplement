import React from 'react';
import './App.css';

import Tasks from './components/Tasks';

class App extends React.Component {

  render() {
    return (
      <div className="todos-app">
        <Tasks/>
      </div>
    );
  }
}

export default App;
  