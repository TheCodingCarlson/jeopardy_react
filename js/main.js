var MyApp = React.createClass({
	render: function() {
		return (
			<div>
				<img id='logo'  className='img-responsive' src='assets/logo.png' />
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
		console.log('infinite load');
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
	componentDidMount: function() {
		window.mySwipe = Swipe(document.getElementById(this._reactInternalInstance._rootNodeID));
	},
	render: function() {
		var question = this.props.data;
		var id = this._reactInternalInstance._rootNodeID;
		return (
			<div id={id} className='swipe'>
				<div className='swipe-wrap'>
					<div className='well' style={{ height: this.props.height }}>
						<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
						<h3>{question[0]}</h3>
						<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					</div>
					<div className='well' style={{ height: this.props.height }}>
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