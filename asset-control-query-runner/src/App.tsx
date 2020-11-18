import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabNav from './components/TabNav';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
        <Container>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand">Query Runner</a>
        </nav>
        <TabNav/>
        </Container>
    </div>
    
  );
}

export default App;
