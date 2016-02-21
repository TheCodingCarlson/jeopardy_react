var MyApp = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Jeopardy</h1>
				<ResultsList />		
			</div>
		);
	}
});

var ResultsList = React.createClass({
	getInitialState: function() {
		return {
			trivia: []
		};
	},
	componentWillMount: function() {
		var info = [];
		this.serverRequest = $.get('http://jservice.io/api/random?count=100', function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].question && data[i].answer) {
					var question = [data[i].question, data[i].answer];
					info.push(question);
				}
			}	
			this.setState({
				trivia: info
			});
		}.bind(this));
	},
	render: function() {
		var questions = this.state.trivia.map(function(question, idx) {
			return <Question key={idx} data={question} />
		});
		return (
			<div>
				{questions}
			</div>
		);
	}
});

var Question = React.createClass({
	componentDidMount: function() {
		window.mySwipe = Swipe(document.getElementById(this._reactInternalInstance._rootNodeID));

	},
	render: function() {
		var question = this.props.data;
		var id = this._reactInternalInstance._rootNodeID;
		return (
			<div id={id} className='swipe'>
				<div className='swipe-wrap well'>
					<div><h2>{question[0]}</h2></div>
					<div><h2>{question[1]}</h2></div>
				</div>
			</div>
		);
	}
});


ReactDOM.render(<MyApp />, document.getElementById('triviaApp'));