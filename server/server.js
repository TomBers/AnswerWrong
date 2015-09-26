Meteor.methods({
  addWrongAns: function(wa){
    WrongAnswers.insert({qnId:wa.qnId,ownerId:wa.ownerId,ans:wa.ans,views:0,choosen:0,answerDist:wa.answerDist,rnd:Math.random()});
  },
  addQn: function(a){
    return Qns.upsert({qn:a.qn,ans:a.ans,rnd:Math.random()},{qn:a.qn,ans:a.ans,rnd:Math.random()});
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
