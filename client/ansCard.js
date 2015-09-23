Template.ansCard.onCreated(function(){
});

Template.ansCard.helpers({
  getQn: function(){
    return Qns.findOne().qn;
  },
  getAns: function(){
    return WrongAnswers.find({qnId:this._id});
  }
});



Template.ansCard.events({
  "click .possAns":function(e,t){

  }
  });
