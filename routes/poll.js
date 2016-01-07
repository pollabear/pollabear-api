var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('./auth').ensureAuthenticated;
var User = require('../models/user');
var Poll = require('../models/poll');


router.post('/create', ensureAuthenticated, function (req, res) {
    // based on page, filters, return a number of statuses
    // res.status(200).send({ message: "Creating a new poll" });
    // console.log(req.body);
    var poll = req.body;

    questionText = poll.text;
    choiceArray = poll.choices;
    choiceArrayLength = choiceArray.length;
    
    // validate form
        // Question has certain number of characters
        // Add ? to end if not one already
        // at least 2 choices, no more than 10
        // Each choice has some text/label
    if (!questionText || choiceArrayLength < 2 || choiceArrayLength > 6) {
        res.status(406).send({ message: "Invalid poll format" });
    }

    // validate choices text
    for (i = 0; i < choiceArrayLength-1; i++) {
        if (!choiceArray[i]) {
            res.status(406).send({ message: "Invalid poll format" });
        } 
    }

    // create the polla object and add choices array
    var newPoll = new Poll({ 
        creator_id: req.user,
        text: questionText,
        choices: choiceArray,
        category: poll.category,
        tags: poll.tags,
        choiceType: poll.choiceType
        // meta: {
        //     image_url: String,
        //     link: String
        // }
    });

    // save to database
    newPoll.save(function (err) {
        if (err) {
            return handleError(err);
        } else {
            // update user pollas array
            User.update(
                { _id: req.user },
                {$push: {"polls": newPoll._id}},
                function (err, raw) {
                    if (err) return handleError(err);
                    res.status(200).send({ message: "Created new poll!" });
                }
            );
        }
    });  

});

module.exports = router;
