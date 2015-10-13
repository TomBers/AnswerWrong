if (Meteor.isClient) {
resetSessionDat()

  Template.ansDeck.onRendered(function(){
    resetSessionDat()
    // Make better at some point
    Meteor.subscribe('Qns');
  });

  Template.addWrongAnswer.onRendered(function(){
    resetSessionDat()
    // Make better at some point
    Meteor.subscribe('Qns');
  });


  Template.addWrongAnswer.helpers({
    cardList: function () {
      return Qns.find({_id:{ $nin: Session.get('seenQns') }},{});
    }
  });

  Template.ansDeck.helpers({
    ansList: function () {
      var ans = Qns.find({_id:{ $nin: Session.get('seenAns') }},{limit:1}).fetch();
      var tmp = Session.get('noQns');

      ans.map(function(e){
      //  if (Math.random() >= 0.7){e.type = 'makeWrongAns';}
      //  else{
         e.type = 'quizCard';
      //  }
       return e;
     });
      return ans;
    }
  });
}

function resetSessionDat(){
  Session.set('wordDist',0);
  Session.set('seenQns',[]);
  Session.set('seenAns',[]);
  Session.set('userScore', 0);
  Session.set('noQns',0);
  Session.set('room','');
}
