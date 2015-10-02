Meteor.startup(function() {

  // var numberOfQns = Qns.find().count();

  Qns.remove({ownerId:"tstQn"});
  WrongAnswers.remove({ownerId:"tst"});

  // if(numberOfQns < 100){
    var tst = Assets.getText('AnswerWrong_Qns.csv');
    var lines = tst.split(/\r\n|\n/);
    lines.forEach(function(qn){
      if(typeof qn[0] !== 'undefined'){
      var parts = qn.split(',');

      var insertQn = Qns.upsert({qn:parts[0],ans:parts[1]},{ownerId:"tstQn",qn:parts[0],ans:parts[1],rnd:Math.random()});
      var wa1 = WrongAnswers.upsert({qnId:insertQn.insertedId,ans:parts[2]},{qnId:insertQn.insertedId,ownerId:'tst',ans:parts[2],views:0,choosen:0,score:0,rnd:Math.random()});
      var wa2 = WrongAnswers.upsert({qnId:insertQn.insertedId,ans:parts[3]},{qnId:insertQn.insertedId,ownerId:'tst',ans:parts[3],views:0,choosen:0,score:0,rnd:Math.random()});
      var wa3 = WrongAnswers.upsert({qnId:insertQn.insertedId,ans:parts[4]},{qnId:insertQn.insertedId,ownerId:'tst',ans:parts[4],views:0,choosen:0,score:0,rnd:Math.random()});

    }

    });


    // console.log(tst.actress);
  // }





});

Meteor.methods({
  addWrongAns: function(wa){
    WrongAnswers.insert({qnId:wa.qnId,ownerId:wa.ownerId,ans:wa.ans,views:0,choosen:0,score:wa.score,rnd:Math.random()});
  },
  addQn: function(a){
    return Qns.upsert({qn:a.qn,ans:a.ans},{ownerId:a.ownerId,qn:a.qn,ans:a.ans,rnd:Math.random()});
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
