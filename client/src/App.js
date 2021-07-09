import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Auth from './components/auth/Auth'
import Home from './components/home/Home'
import Room from './components/room/Room'


function App() {

  return (
    <Router>
      <div className="app">
        <Route path={'/'} exact component={ Auth } />
        <Route path={'/home'} exact component={Home} />
        <Route path={'/room/:id'} exact component={Room} />
      </div>
    </Router>
  );
}

export default App;
