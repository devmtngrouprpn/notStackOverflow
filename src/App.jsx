import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Questions from "./components/Questions/Questions.jsx";
import Tags from "./components/Tags/Tags.jsx";
import Users from "./components/Users/Users.jsx";
import axios from "axios";
import "./App.css";
import QuestionsId from "./components/Questions/QuestionsId.jsx";
import TagsId from "./components/Tags/TagsId.jsx";
import UsersId from "./components/Users/UsersId.jsx";
import QuestionCreator from "./components/QuestionCreator/QuestionCreator";
import QuestionEditor from "./components/Questions/QuestionEditor";
import AnswerEditor from "./components/Questions/AnswerEditor.jsx";
import SearchResults from "./components/Search/SearchResults.jsx";
class App extends Component {
  getHome() {
    let auth_id = "user1";
    let res = axios.get(`/api/home/${auth_id}`);
    console.log(res);
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          {/* <ScrollToTop /> */}
          <Route exact path="/" component={Home} />
          <Route path="/questions/:id" component={QuestionsId} />
          <Route path="/questions" component={Questions} />
          <Route path="/tags/:name" component={TagsId} />
          <Route path="/tags" component={Tags} />
          <Route path="/users/:id" component={UsersId} />
          <Route path="/users" component={Users} />
          <Route path="/create-question" component={QuestionCreator} />
          <Route path="/edit/question/:id" component={QuestionEditor} />
          <Route path="/edit/answer/:id" component={AnswerEditor} />
          <Route path="/search" component={SearchResults} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
