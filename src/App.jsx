import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Question from './components/Questions/Questions.jsx';
import Tags from './components/Tags/Tags.jsx';
import Users from './components/Users/Users.jsx';
import './App.css';
class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
      </div>
    )
=======
      <>
        <Switch>
          <Route exact path='/' component={Home} /> // home
          <Route path='/questions' component={Question} /> // questions
          <Route path='/tags' component={Tags} /> // tags
          <Route path='/users' component={Users} /> // users
        </Switch>
      </>
    );
>>>>>>> frontend-skeleton
  }
}

export default App
