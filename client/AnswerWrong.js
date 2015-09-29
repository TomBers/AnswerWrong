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
      var ans = Qns.find({_id:{ $nin: Session.get('seenAns') }},{});
      if(Session.get("noQns") === 0){
       Session.set('noQns',ans.fetch().length);
     }
      return ans;
    }
  });

}
