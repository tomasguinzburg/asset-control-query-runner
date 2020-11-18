import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabNav from './components/TabNav';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand">Query Runner</a>
        </nav>
        <div style={{ margin: '2%' }}>
          <Container>
          <TabNav/>
          </Container>
        </div>
    </div>
    
  );
}

export default App;
