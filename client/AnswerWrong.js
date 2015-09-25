if (Meteor.isClient) {
  Session.setDefault('wordDist',0);
  Session.setDefault('seenQns',[]);
  Session.setDefault('seenAns',[]);


  Template.cardDeck.helpers({
    cardList: function () {
      return Qns.find({_id:{ $nin: Session.get('seenQns') }},{});
    }
  });
  Template.ansDeck.helpers({
    ansList: function () {
      return Qns.find({_id:{ $nin: Session.get('seenAns') }},{});
    }
  });

}
