// function getData() {
	var info = [];
	$.get('http://jservice.io/api/random?count=100', function(data) {
		for(var i = 0; i < data.length; i++) {
			var obj = {'question': data[i].question, 'answer': data[i].answer};
			info.push(obj);	
		}
		console.log(info);
	});
	
// }


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
			question: '',
			answer: ''
		};
	},
	componentDidMount: function() {
		this.serverRequest = $.get('http://jservice.io/api/random?count=100', function(data) {
			var first = data[0];
			this.setState({
				question: first.question,
				answer: first.answer
			});
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				{this.state.question}
				{this.state.answer}
			</div>
		);
	}

});

var Questions = React.createClass({
	render: function() {
		return (
			<div>
				<p>One Para</p>
				<p>Two Para</p>
			</div>
		);
	}
});


ReactDOM.render(<MyApp />, document.getElementById('sportsApp'));