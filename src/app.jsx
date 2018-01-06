// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import QuestionList from './components/QuestionList.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                {/* <img id='logo'  className='img-responsive' src='assets/logo.png' /> */}
                <Router>
                    <div>
                        <Route exact path='/' component={QuestionList} />
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('triviaApp'));