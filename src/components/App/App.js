import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header';
import ListArticles from '../ListArticles/ListArticles';
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import EditProfile from '../EditProfile/EditProfile';
import EditArticle from '../EditArticle/EditArticle';
// eslint-disable-next-line no-unused-vars
import CreateArticle from '../CreatArticle/CreateArticle';

export default function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const updateUser = (users) => {
    setUser(users);
  };
  return (
    <div>
      <Router>
        <Header user={user} updateUser={updateUser} />
        <Route path="/articles" exact render={() => <ListArticles user={user} />} />
        <Route path="/" render={() => <ListArticles user={user} />} exact />
        <Route
          path="/articles/:slug"
          exact
          render={({ match }) => (
            <Article user={user} slug={match.params.slug} />
          )}
        />
        <Route
          path="/articles/:slug/edit"
          render={({ match }) => (
            <EditArticle user={user} slug={match.params.slug} edit={true} />
          )}
        />
        <Route
          path="/new-article"
          exact
          render={({ match }) => <EditArticle user={user} slug={match.params.slug} />}
        />
        <Route
          path="/profile"
          exact
          render={() => (
            <EditProfile updateUser={updateUser} userProfile={user} />
          )}
        />
        <Route
          path="/sign-in"
          exact
          render={() => <SignIn updateUser={updateUser} />}
        />
        <Route
          path="/sign-up"
          exact
          render={() => <SignUp updateUser={updateUser} />}
        />
      </Router>
    </div>
  );
}
