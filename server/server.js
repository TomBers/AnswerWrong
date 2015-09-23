Meteor.methods({
  addWrongAns: function(wa){
    WrongAnswers.insert({qnId:wa.qnId,ownerId:wa.ownerId,ans:wa.ans,views:0,choosen:0,answerDist:wa.answerDist});
  },
  addQn: function(a){
    return Qns.upsert({qn:a.qn,ans:a.ans},{qn:a.qn,ans:a.ans});
    // Qns.insert({qn:qn,ra:ra});
  },

});
