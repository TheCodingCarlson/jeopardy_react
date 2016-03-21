import React from 'react';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import Swipe from 'swipe-js';

var MyApp = React.createClass({
	render: function() {
		return (
			<div>
				<img src='assets/logo.png' className='img-responsive' />
				<ResultsList />
			</div>
		);
	}
});

var ResultsList = React.createClass({
	getInitialState: function() {
		return {
			trivia: [],
			isInfiniteLoading: false
		}
	},
	getData: function(callback) {
		$.get('http://jservice.io/api/random?count=10', callback);	
	},
	buildElements: function(data) {
		var newQuestions = [];
		var count = this.state.trivia.length;
		for(var i = 0; i < data.length; i++) {
			if(data[i].question && data[i].answer) {
				count++;
				var question = [data[i].question, data[i].answer];
				newQuestions.push(<Question key={count} data={question}/>);
			}
		}
		this.setState({
			isInfiniteLoading: false,
			trivia: this.state.trivia.concat(newQuestions)
		})
	},
	getMoreData: function() {
		var that = this;
		this.setState({
			isInfiniteLoading: true
		});
		setTimeout(function() {
			that.getData(that.buildElements);
		}, 1500);	
	},
	questionInfiniteLoad: function() {
		return <div className='infinite-list-item'><h1>Loading...</h1></div>;
	},
	render: function() {
		return (
			<div>
				<Infinite useWindowAsScrollContainer 
				elementHeight={300} 
				infiniteLoadBeginEdgeOffset={100}
				onInfiniteLoad={this.getMoreData}
				loadingSpinnerDelegate={this.questionInfiniteLoad()}
				isInfiniteLoading={this.state.isInfiniteLoading}
                timeScrollStateLastsForAfterUserScrolls={0}
                >
				{this.state.trivia}
				</Infinite>
			</div>
		);
	}
});

var Question = React.createClass({
	getDefaultProps: function() {
		return {
			height: 300
		}
	},
	textTransform: function(divID) {
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			var offset = $(divID).offset().top;
			var height = $(divID).height();

			if(scroll > offset - height) {
				$(divID).find('h3').addClass('text-transition');
				
			}
		});
	},
	componentDidMount: function() {
		window.mySwipe = Swipe(document.getElementById(this._reactInternalInstance._rootNodeID));
		this.textTransform(document.getElementById(this._reactInternalInstance._rootNodeID));
	},
	componentWillUnmount:function() {
	      var el = document.getElementById(this._reactInternalInstance._rootNodeID);
	      $(el).removeClass('text-transition');
	},
	render: function() {
		var question = this.props.data;
		var id = this._reactInternalInstance._rootNodeID;
		return (
			<div id={id} className='swipe'>
				<div className='swipe-wrap'>
						<div className='well' style={{ height: this.props.height }}>
						<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<h3>{question[0]}</h3>
						</div> 
						<div className='well' style={{ height: this.props.height }}>
							<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<h3>{question[1]}</h3>
						</div>
				</div>
			</div>
			
		);
	}
});

ReactDOM.render(<MyApp />, document.getElementById('triviaApp'));