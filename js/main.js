$.get('http://jservice.io/api/clues', function(data) {
	for(var i = 0; i < data.length; i++) {
		if(data[i].question !== '') {
			console.log(data[i].question);
		}
	}
});


var MyApp = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Jeopardy</h1>
			</div>
		);
	}
});



ReactDOM.render(<MyApp />, document.getElementById('sportsApp'));