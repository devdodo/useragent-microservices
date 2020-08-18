// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Whoami api
app.get("/api/whoami", (req, res) => {
  var ip = req.headers['x-forward-for'] || req.connection.remoteAddress;
  var ua = req.headers['user-agent'];
  var ac = req.headers['accept-language'];

  console.log(ip);
  
  const jsonObject = {
    "ipaddress": ip,
    "language": ac,
    "software": ua
  }
  
  res.json(jsonObject);
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
