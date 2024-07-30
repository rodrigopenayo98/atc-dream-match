import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetail from './components/TeamDetail';
import PlayerList from './components/PlayerList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/teams" component={Teams} />
          <Route path="/team/:id" component={TeamDetail} />
          <Route path="/players" component={PlayerList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

