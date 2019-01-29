import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Question from './components/Questions/Questions.jsx';
import Tags from './components/Tags/Tags.jsx';
import Users from './components/Users/Users.jsx';
import axios from 'axios'
import './App.css';
class App extends Component {
  getHome(){
    let auth_id = 'user1'
    let res = axios.get(`/api/home/${auth_id}`)
    console.log(res)
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/' component={Home} /> // home
          <Route path='/questions' component={Question} /> // questions
          <Route path='/tags' component={Tags} /> // tags
          <Route path='/users' component={Users} /> // users
        </Switch>
          <button onClick={this.getHome}> Click ME For Real</button>
      </>
    );
  }
}

export default App
