import React from 'react';
import _ from 'underscore';

class Question extends React.Component {
    componentWillMount() {
        const id = _.uniqueId('question-');
        this.setState({id: id});
    }

    render() {
        const question = this.props.data;

        return (
            // <div id={this.state.id} className='swipe'>
            //     <div className='swipe-wrap'>
            //         <div className='well' style={{ height: this.props.height }}>
            //             <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            //             <h3>{question[0]}</h3>
            //             <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            //         </div>
            //         <div className='well' style={{ height: this.props.height }}>
            //             <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            //             <h3>{question[1]}</h3>
            //             <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            //         </div>
            //     </div>
            // </div>

            <div>
                <h3>{question[0]}</h3>
                <h3>{question[1]}</h3>
            </div>
        );
    }
}

Question.defaultProps = {
    height: 300
}

export default Question;