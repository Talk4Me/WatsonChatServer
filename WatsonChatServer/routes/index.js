var express = require('express');
var router = express.Router();
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk

// Create the service wrapper
var conversation = new Conversation({
    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    username: 'c1400ff8-18cf-4152-9d2e-b1c5b3b549f8',
    password: 'klakz3fyeEhy',
    // url: 'https://gateway.watsonplatform.net/conversation/api',
    version_date: Conversation.VERSION_DATE_2017_04_21
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/api/message/', function (req, res) {
    //    var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
    //    if (!workspace || workspace === '<workspace-id>') {
    //        return res.json({
    //            'output': {
    //                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
    //            }
    //        });
    //    }
    var payload = {
        workspace_id: 'a0450ddc-6160-47c1-8ac2-8ff8487e0802', //process.env.WORKSPACE_ID, //workspace,
        //context: req.body.context || {},
        input: req.body[0] || {}
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