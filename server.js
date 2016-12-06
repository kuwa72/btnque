
/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , join = require('./routes/join')
  , http = require('http')
  , path = require('path')
  , azure = require('azure-storage');

var app = express();

var queueName = 'btnqueue';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

var queueService = azure.createQueueService();
queueService.createQueueIfNotExists(queueName, error => {
});

var joinObj = join(queueService, queueName);
console.log(joinObj);

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/join', joinObj.get);
app.post('/join/:id', joinObj.post);

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})
