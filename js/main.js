var MyApp = React.createClass({
	render: function() {
		return (
			<div>
				<img id='logo'  className='img-responsive' src='/assets/logo.jpg' />
				<ResultsList />	
			</div>
		);
	}
});

var ResultsList = React.createClass({
	getInitialState: function() {
		return {
			trivia: []
		}
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
	componentDidMount: function() {
		window.onscroll = function(ev) {
    		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    			console.log('bottom!');
    		}
		}
	},
	render: function() {
		var questions = this.state.trivia.map(function(question, idx) {
			return <Question key={idx} data={question} />
		});
		return (
			<div className='main'>
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
				<div className='swipe-wrap'>
					<div className='well'>
						<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<h3>{question[0]}</h3>
						<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					</div>
					<div className='well'>
						<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<h3>{question[1]}</h3>
						<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					</div>
				</div>
			</div>
		);
	}
});


ReactDOM.render(<MyApp />, document.getElementById('triviaApp'));