var express = require('express');
var router = express.Router();
var ensureAuthenticated = express.Router().ensureAuthenticated;
var User = require('../../models/user');
var polla = require('../../models/poll');
// var User = require('../../models/user');

// login

// signup

// logout

router.post('/create', ensureAuthenticated, function (req, res) {
    // based on page, filters, return a number of statuses
    



});

module.exports = router;