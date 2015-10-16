Template.myWrongAnswers.onCreated(function(){
  Meteor.subscribe("myWrongAnswers", Meteor.userId());
});


Template.myWrongAnswers.helpers({
  WrongAnswer: function(){
     return WrongAnswers.find({ownerId: Meteor.userId()},{sort:{choosen:-1}});
  },
  percent:function(){
    return Math.round((this.choosen / this.views) * 100);
  },
  totalScore:function(){
    return this.choosen * this.score || 0;
  }
});
