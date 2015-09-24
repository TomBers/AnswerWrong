if (Meteor.isClient) {
  Session.setDefault('wordDist',0);
  // counter starts at 0
  // Session.setDefault('counter', 0);
  // Session.setDefault("cards", ['Title']);
  // Session.setDefault("tstText", '');

  // var wa = new wrongAns(1,2,3);
  // console.log(wa.answerDist);
  // console.log(wa.calcDist("S"));

  // var q1 = new Qn("Question2","Correct Answer2");
  // q1.commitToDb();



  Template.cardDeck.helpers({
    cardList: function () {
      return Qns.find({});
    }
  });
  Template.ansDeck.helpers({
    ansList: function () {
      return Qns.find({});
    }
  });

  // Template.card.helpers({
  //   tstText: function(){
  //     if(Session.get('tstText') === ''){return Session.get('cards');}
  //     else{return Session.get('tstText');}
  //   }
  // });


  // Template.card.events({
  //   'click .card': function (e,t) {
  //     // console.log(e.currentTarget);
  //
  //     Velocity(e.currentTarget,{ height: "800px",width:"800px", 'font-size':['5em','2em'],'display': ['block','flex'] },{duration:2000,})
  //     .then(function(elements) { console.log("done");
  //     Session.set('tstText',"This will be the content of the question"); });
  //
  //
  //
  //   }
  // });


}
