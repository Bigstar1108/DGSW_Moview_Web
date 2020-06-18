import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import CreditDetail from './pages/CreditDetail';
import SearchMovie from './pages/SearchMovie';

const Rootdiv = styled.div`
  height : 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding : 0;
  }
`;

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
        <GlobalStyle />
        <Rootdiv>
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/join" component = {Join} />
            <Route exact path = "/profile" component = {Profile} />
            <Route exact path = "/searchmovie" component = {SearchMovie} />
            <Route exact path = '/detail/:movieId' component = {Detail} />
            <Route exact path = '/detail/:movieId/credit' component = {CreditDetail} />
          </Switch>
        </Rootdiv>
      </React.Fragment>
      
    );
  }
}

export default App;