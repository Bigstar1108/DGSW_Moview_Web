import React from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';
import Detail from './pages/Detail';

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
          <Route exact path = "/" component = {Home} />
          <Route path = "/login" component = {Login} />
          <Route path = "/join" component = {Join} />
          <Route path = "/profile" component = {Profile} />
          <Route path = '/detail/:movieId' component = {Detail} />
        </Rootdiv>
      </React.Fragment>
      
    );
  }
}

export default App;