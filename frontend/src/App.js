import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import React from 'react';

import CongressTrades from './Components/CongressTrades/CongressTrades';
import TickerDetail from './Components/TickerDetail/TickerDetail';
import CongressPersonDetail from './Components/CongressPersonDetail/CongressPersonDetail';
import CongressPeople from './Components/CongressPeople/CongressPeople';
import NotFound from './Components/NotFound/NotFound';

import './App.css';

function App() {
    return (
        <Router>
            <div className="">
                <Switch>
                    <Route exact path='/404' component={NotFound} />
                    <Route exact path="/" component={CongressTrades} />
                    <Route exact path="/Senate-Trades" component={CongressTrades} />
                    <Route exact path="/Senate-People" component={CongressPeople}/>

                    <Route exact path="/ticker/:slug" component={TickerDetail}/>
                    <Route exact path="/congress-people/:slug" component={CongressPersonDetail}/>
                    <Redirect to="/404" />
                </Switch>
            </div>

        </Router>

    );
}

export default App;