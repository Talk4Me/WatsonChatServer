var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//// Create the service wrapper
//var conversation = new Conversation({
//    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
//    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
//    username: 'c1400ff8-18cf-4152-9d2e-b1c5b3b549f8',
//    password: 'klakz3fyeEhy',
//    // url: 'https://gateway.watsonplatform.net/conversation/api',
//    version_date: Conversation.VERSION_DATE_2017_04_21
//});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// Endpoint to be call from the client side
//app.post('/api/message', function (req, res) {
////    var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
////    if (!workspace || workspace === '<workspace-id>') {
////        return res.json({
////            'output': {
////                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
////            }
////        });
////    }
//    var payload = {
//        workspace_id: workspace,
//        context: req.body.context || {},
//        input: req.body.input || {}
//    };
//
//    // Send the input to the conversation service
//    conversation.message(payload, function (err, data) {
//        if (err) {
//            return res.status(err.code || 500).json(err);
//        }
//        return res.json(data);
//    });
//});




module.exports = app;
