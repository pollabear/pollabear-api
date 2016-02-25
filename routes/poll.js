var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('./auth').ensureAuthenticated;
var User = require('../models/user');
var Poll = require('../models/poll');
var Category = require('../models/category');
var Access = require('../models/access');
var Choice = require('../models/choice');
var Vote = require('../models/vote');
var Sex = require('../models/sex');
var Promise = require("bluebird");

router.post('/create', function (req, res) {
    //Validate data
    if(req.body.choiceArray.length == 0 || req.body.choiceArray.length > 5){
	res.status(400);
	res.json({"status":"error","message":"Invalid Number of Choices"});
	return;
    }
    else{
	//Create Poll
	Poll.create({
	    title: req.body.title,
	    creator: req.body.userId,
	    category: req.body.category,
	}).then(function(poll){
	    for(i = 0; i < req.body.choiceArray.length; i++){
		Choice.create({
		    pollId: poll.pollId,
		    choiceText: req.body.choiceArray[i]
		});
	    }
	    return poll;
	}).then(function(poll){
	    res.json({"poll":poll});
	    res.status(200);
	}).catch(function(error){
	    res.sendStatus(400);
	});
    }
});

router.get('/poll',function(req,res){
    Poll.findOne({
	where:{
	    pollId: req.query.pollId
	}
    }).then(function(poll){
	if(!poll){
	    res.status(400);
	    res.json({"status":"error","message":"Poll Not Found"});
	}
	else{
	    	res.send(poll);
	}
    }).catch(function(error){
	res.status(400);
	res.send(error);
    });
});

router.post('/vote',function(req,res){
    var canVote;
    var foundUser;
    var promises = []
    //Make sure user hasnt voted on poll
    promises.push(Vote.findAll({
	where: {
	    userId: req.body.userId,
	    pollId: req.body.pollId
	}
    }).then(function(votes){
	if(votes.length == 0){
	    canVote = true;
	}
	else{
	    canVote = false;
	}
    }));

    //find user
    promises.push(User.findOne({
	where: {
	    userId: req.body.userId
	}
    }).then(function(user){
	foundUser = user;
    }));

    //Once both have finished, increment choice and add vote
    Promise.all(promises).then(function(){
	if(foundUser && canVote){
	    Choice.find({
		where: {
		    choiceId:req.body.choiceId,
		    pollId:req.body.pollId
		}
	    }).then(function(choice){
		choice.voteCount++;
		choice.save();
	    });
	    Poll.findOne({
		where: {
		    pollId: req.body.pollId
		}
	    }).then(function(poll){
		poll.voteCount++;
		poll.save();
	    });
	    Vote.create({
		choiceId:req.body.choiceId,
		userId:req.body.userId,
		pollId:req.body.pollId,
		genderId: foundUser.gender
	    }).then(function(){
		res.sendStatus(200);
	    });
	}
	else{
	    res.status(400);
	    if(canVote){    
		res.json({"status":"error","message":"User already voted on poll"});
	    }
	    else{
		res.json({"status":"error","message":"User not found"});
	    }
	}
    });
   
});

router.get("/pollChoices",function(req,res){
    Choice.findAll({
	where: {
	    pollId: req.query.pollId
	}
    }).then(function(choices){
	if(choices.length <= 0){
	    res.status(400);
	    res.json({"status":"error","message":"Poll not found"});
	}
	else{
	    res.send(choices);
	}
    }).catch(function(error){
	res.sendStatus(400);
    });
});

router.get("/totalPollVotes",function(req,res){
    Choice.findAll({
	where: {
	    pollId: req.query.pollId
	}
    }).then(function(choices){
	totalVotes = 0;
	for (i = 0; i < choices.length; i++){
	    totalVotes = totalVotes+(choices[i].voteCount);
	}
	res.json({"voteCount":totalVotes});
    }).catch(function(error){
	console.log(error);
	res.sendStatus(400);
    });
});

router.get("/votesForUser",function(req,res){
    Vote.findAll({
	where: {
	    userId: req.query.userId
	}
    }).then(function(votes){
	res.send(votes);
    }).catch(function(error){
	res.send(error);
    });
});

router.get("/lastXPolls",function(req,res){
    Poll.findAll({
	order: '"createdAt" DESC',
	limit: req.query.pollCount
    }).then(function(polls){
	res.send(polls);
    }).catch(function(error){
	res.send(error);
    });
});

router.get("/topXPolls",function(req,res){
    Poll.findAll({
	order: '"voteCount" DESC',
	limit: req.query.pollCount
    }).then(function(polls){
	res.send(polls);
    }).catch(function(error){
	res.send(error);
    });
})

router.get('/test',function(req,res){
    User.create({
	email:"david@pollabear.com",
	password:"foo",
	gender:1
    });
    res.sendStatus(200);
});

router.get('/reset',function(req,res){
    Sex.sync({force:true})
	.then(User.sync({force:true}))
	.then(Category.sync({force:true})
	      .then(Access.sync({force:true})
		    .then(Poll.sync({force:true})
			   .then(Choice.sync({force:true})
				 .then(Vote.sync({force:true}))))));
    res.sendStatus(200);
});


module.exports = router;
