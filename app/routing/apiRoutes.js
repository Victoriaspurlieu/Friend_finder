var friendsData = require('../data/friends.js');


// Includes Two Routes
function apiRoutes(app) {

  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  app.post('/api/friends', function (req, res) {

    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;


    // Check the new friend entry with the existing ones
    var scoreComparisionArray = [];
    for(var i=0; i < friendsData.length; i++){

    // Check each friend's scores and sum difference 
    var currentComparison = 0;
    for(var j=0; j < newFriend.scores.length; j++){
      currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
    }

      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }

    var bestMatchPosition = 0; 
    for(var i=1; i < scoreComparisionArray.length; i++){
      
    if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
      bestMatchPosition = i;
    }
 }

    //If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
    var bestFriendMatch = friendsData[bestMatchPosition];

    res.json(bestFriendMatch);

    friendsData.push(newFriend);

  });

}

module.exports = apiRoutes;