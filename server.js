
/**
* Module dependencies.
*/

const express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , join = require('./routes/join')
  , http = require('http')
  , path = require('path')
  , azure = require('azure-storage');

const app = express();

const queueName = 'btnqueue';

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const queueService = azure.createQueueService();
queueService.createQueueIfNotExists(queueName, error => {
});

const joinObj = join(queueService, queueName);
console.log(joinObj);

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/join', joinObj.get);
app.post('/join/:id', joinObj.post);

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})
