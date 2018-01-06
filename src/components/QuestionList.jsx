import React from 'react';
import { Link } from 'react-router-dom';
import Infinite from 'react-infinite';

import Question from './Question.jsx';

class QuestionList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            trivia: [],
            isInfiniteLoading: false
        }
    }

    buildElements = (data) => {
        const newQuestions = [];
        let count = this.state.trivia.length;

        data.map(item => {
            if(item.question && item.answer) {
                count++;
                let question = [item.question, item.answer];
                newQuestions.push(<Question key={count} data={question} />)
            }
        });

        this.setState({
            isInfiniteLoading: false,
            trivia: this.state.trivia.concat(newQuestions)
        });

        console.log(this.state.trivia);

    }

    getData = (callback) => {
        fetch('http://jservice.io/api/random?count=10')
        .then(res => {
            res.json().then(data => {
                this.buildElements(data);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    showLoadingMessage () { return <div className='infinite-list-item'><h1>Loading...</h1></div>; }
	
    render() {
        return (
            <Infinite 
                useWindowAsScrollContainer 
                elementHeight={300} 
                infiniteLoadBeginEdgeOffset={100}
                onInfiniteLoad={this.getData}
                loadingSpinnerDelegate={this.showLoadingMessage()}
                isInfiniteLoading={this.state.isInfiniteLoading}
                timeScrollStateLastsForAfterUserScrolls={0}>
                {this.state.trivia}
            </Infinite>
        );
    }
}

export default QuestionList;