import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Auth from './components/auth/Auth'
import Home from './components/home/Home'


function App() {
  return (
    <Router>
      <div className="app">
        <Route path={'/'} exact ><Auth /></Route>
        <Route path={'/home'} exact ><Home /></Route>
      </div>
    </Router>
  );
}

export default App;
