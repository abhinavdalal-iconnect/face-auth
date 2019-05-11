const express = require('express');
const app = express();
const path = require('path');

// app.get('/',function(req,res) {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });
// app.get('/main.js',function(req,res) {
//   res.sendFile(path.join(__dirname + '/main.js'));
// });
// app.get('/main.css',function(req,res) {
//   res.sendFile(path.join(__dirname + '/main.css'));
// });
app.use(express.static(path.join(__dirname + '/public')));

app.listen(3000);
