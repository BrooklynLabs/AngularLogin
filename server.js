var express = require('express');
var app = express();

var port = process.env.PORT || 3003;

//console.log(__dirname);
app.use(express.static(__dirname));
app.listen(port, function(){
	console.log("started" + port);
});