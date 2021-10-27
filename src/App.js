import './App.css';
import Header from '../src/components/Header';
import Home from '../src/components/Home';
import { Route } from 'react-router-dom'
import Checkout from '../src/components/Checkout';
import Login from './components/Login';

function App() {

  return (
      
      <div className="app">
          <Route path="/" component={Header}/>
          <Route exact path="/" component={Home}/>
          <Route path="/checkout"  component={Checkout}/> 
          <Route path="/options">
              <h1>check me out my options</h1>
          </Route>
          <Route path="/login" component={Login} />
      </div>
    
  );
}

export default App;
