// function getData() {
// 	$.get('http://jservice.io/api/random?count=100', function(data) {
// 		var info = [];
// 		for(var i = 0; i < data.length; i++) {
// 			var obj = {'question': data[i].question, 'answer': data[i].answer};
// 			info.push(obj);	
// 		}
// 		console.log(info);
// 	});
// }


var MyApp = React.createClass({
	getData: function() {
		$.get('http://jservice.io/api/random?count=100', function(data) {
			var info = [];
			for(var i = 0; i < data.length; i++) {
				var obj = {'question': data[i].question, 'answer': data[i].answer};
				info.push(obj);	
			}
			return info;
		});
	},
	render: function() {
		return (
			<div>
				<h1>Jeopardy</h1>
				<ResultList data={this.getData}
			</div>
		);
	}
});

var ResultList = Reach.createClass({
	render: function() {
		
	}
});



ReactDOM.render(<MyApp />, document.getElementById('sportsApp'));