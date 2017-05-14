var express = require('express');
var router = express.Router();

var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdkvar 
format = require('string-format');

// Create the service wrapper
var conversation = new Conversation({
    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    username: 'c1400ff8-18cf-4152-9d2e-b1c5b3b549f8',
    password: 'klakz3fyeEhy',
    version_date: Conversation.VERSION_DATE_2017_04_21
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/api/message/', function (req, res) {
    //format.extend(String.prototype);
    //var request = '{"input":{"text":"{0}"}}'.format(req.body[0]);

    var payload = {
        workspace_id: process.env.WORKSPACE_ID, //'a0450ddc-6160-47c1-8ac2-8ff8487e0802', //process.env.WORKSPACE_ID, //workspace,
        //context: req.body.context || {},
        input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, function (err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }
        return res.json(data);
    });
});

module.exports = router;