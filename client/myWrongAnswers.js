Template.myWrongAnswers.helpers({
  WrongAnswer: function(){
     return WrongAnswers.find({ownerId: Meteor.userId()},{sort:{choosen:-1}});
  },
  percent:function(){
    return Math.round((this.choosen / this.views) * 100);
  }
});
