// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Trivia from './components/Trivia.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Trivia} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('triviaApp'));