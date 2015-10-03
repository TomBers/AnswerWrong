if (Meteor.isClient) {
  Session.set('wordDist',0);
  Session.set('seenQns',[]);
  Session.set('seenAns',[]);
  Session.set('userScore', 0);
  Session.set('noQns',0);


  Template.addWrongAnswer.helpers({
    cardList: function () {
      return Qns.find({_id:{ $nin: Session.get('seenQns') }},{});
    }
  });
  Template.ansDeck.helpers({
    ansList: function () {
      var ans = Qns.find({_id:{ $nin: Session.get('seenAns') }},{}).fetch();
      var tmp = Session.get('noQns');
      if(tmp < ans.length){
       Session.set('noQns',ans.length);
     }
     ans.map(function(e){
       if (Math.random() >= 0.7){e.type = 'makeWrongAns';}
       else{e.type = 'quizCard';}
       return e;
     });
      return ans;
    }
  });

}
