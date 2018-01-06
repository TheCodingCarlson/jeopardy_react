var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist/'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 3000, () => console.log('Suck it Trebek!'));