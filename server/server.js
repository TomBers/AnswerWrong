// Make Publications better at some point

Meteor.publish("Qns", function(){
  return Qns.find();
});

Meteor.publish("Ans", function(){
  return WrongAnswers.find();
});

Meteor.publish("allOnlineUsers", function() {
  return Meteor.users.find({ "status.online": true }, {});
});


Meteor.publish("Invites", function(me) {
  return Invites.find({you:me});
});

Meteor.publish("Rooms", function (nme) {
  return Rooms.find({_id:nme});
});

Meteor.publish("RoomUserStatus", function(room) {
  return Meteor.users.find({ "status.online": true, room:room }, {});
});

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

});

Meteor.methods({
  addWrongAns: function(wa){
    WrongAnswers.insert({qnId:wa.qnId,ownerId:wa.ownerId,ans:wa.ans,views:0,choosen:0,score:wa.score,rnd:Math.random(),room:wa.room});

    // Change My Game State to Waiting
    Meteor.users.update({_id:wa.ownerId}, {$set:{gameState:"WT"}} );

    // Check if all answers have finished - if so change AU's state to be AQ
    // var outstanding = .fetch();
    if( Meteor.users.find( {"status.online": true, room:wa.room, gameState:"CA"}).count() === 0){
      var au = Rooms.findOne({_id:wa.room}).activeUser;
      Meteor.users.update({_id:au}, {$set:{gameState:"AQ"}} );
    }

  },
  addQn: function(a){
    return Qns.upsert({qn:a.qn,ans:a.ans},{ownerId:a.ownerId,qn:a.qn,ans:a.ans,rnd:Math.random()});
  },
  updateNoViewsAndCompleteTurn:function(WrongAnswersShown,usr,room){
    // console.log(WrongAnswersShown);
    Meteor.users.update({room:room},{$set:{gameState:'CA'}},{multi: true});
    Meteor.users.update({_id:usr}, {$set:{gameState:"WT"}} );


    if(WrongAnswersShown && WrongAnswersShown.length > 0){
      return WrongAnswers.update( {_id: {$in:WrongAnswersShown}},
        {$inc: {views:1}},
        {multi:true} );
      }
    },
    updateChoosenAnswer:function(selAns){
      return WrongAnswers.update( {_id: selAns},{$inc: {choosen:1}});
    },
    createRoom:function(au){
      return Rooms.insert({activeUser:au,rnd:Math.random()});
    },
    updateRoomActiveUser: function(room,au){
      Rooms.update({_id:room}, {$set:{activeUser:au}});
      Meteor.users.update({room:room},{$set:{gameState:'CA'}},{multi: true});
      Meteor.users.update({_id:au}, {$set:{gameState:"WT"}} )
    },
    // cycleActiveUser: function(room){
    //   // get users in room
    //   var users = Meteor.users.find({ "status.online": true, room:room }, {sort: {time:1}} ).fetch();
    //   // console.log(users);
    //   // get current active user
    //   var tcau = Rooms.find({_id:room}).fetch();
    //   // console.log(tcau);
    //   var cau = tcau[0].activeUser;
    //
    //   var au = '';
    //   for(var i = 0; i < users.length  ; i++){
    //     if(users[i]._id === cau){
    //       if(i === (users.length - 1)){au = users[0];}
    //       else{
    //         var j = i+1;
    //         au = users[j];
    //     }
    //   }
    // }
    //   return Rooms.update({_id:room}, {$set:{activeUser:au._id}});
    // },
    acceptInvite:function(invite){
      Invites.remove({_id:invite});

    },
    inviteUsers: function(yous,me,room){
      yous.forEach(function(you){
        Invites.insert({you:you,me:me,room:room});
      });
    },
    // Simple State system 4 states, ActiveUser(waiting for answers), Creating Answer, Finished Answer, AnswerQn
    updateUserRoom:function(me,room){
      var au = Meteor.users.find( {"status.online": true, room:room, gameState:"WT"} ).fetch();
      // If I am first in the room, let me be the Active user
      if(au.length === 0){
      return Meteor.users.update({_id:me}, {$set:{room:room,gameState:"WT",time:new Date()}} );
    }else{
      return Meteor.users.update({_id:me}, {$set:{room:room,gameState:"CA",time:new Date()}} );
    }
    }

  });
