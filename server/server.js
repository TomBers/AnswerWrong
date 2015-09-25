Meteor.methods({
  addWrongAns: function(wa){
    WrongAnswers.insert({qnId:wa.qnId,ownerId:wa.ownerId,ans:wa.ans,views:0,choosen:0,answerDist:wa.answerDist});
  },
  addQn: function(a){
    return Qns.upsert({qn:a.qn,ans:a.ans},{qn:a.qn,ans:a.ans});
  },
  updateViews:function(WrongAnswersShown){
    // console.log(WrongAnswersShown);
    if(WrongAnswersShown && WrongAnswersShown.length > 0){
    return WrongAnswers.update( {_id: {$in:WrongAnswersShown}},
                         {$inc: {views:1}},
                         {multi:true} );
    }
  },
  updateChoosenAnswer:function(selAns){
    return WrongAnswers.update( {_id: selAns},{$inc: {choosen:1}});
  }

});
