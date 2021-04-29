import React from 'react';

import {Header} from './components';
import {Home, Basket} from './pages';
import {Route} from 'react-router-dom';

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route path="/" component={Home} exact/>
                <Route path="/basket" component={Basket} exact/>
            </div>
        </div>
    );
}

export default App;