if (Meteor.isClient) {
  Session.setDefault('wordDist',0);
  Session.setDefault('seenQns',[]);
  Session.setDefault('seenAns',[]);
  Session.setDefault('userScore', 0);
  Session.setDefault('noQns',0);


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
