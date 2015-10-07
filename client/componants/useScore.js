Template.userScore.helpers({
  userScore: function(){
     return Session.get('userScore')+' / ' + Session.get('noQns');
  }
});
