Template.room.onRendered(function(){
  var room = this.data._id;
  Session.set(room,[]);
  Session.set('room',this.data._id);
  Meteor.call('updateUserRoom',Meteor.userId(),room, function(e,d){
    Meteor.subscribe('RoomUserStatus',room);
  });

  Meteor.subscribe('Qns');

});

Template.room.helpers({
  onlineUsers: function(){
    var tmp = Meteor.users.find().fetch();
    Session.set(this._id,tmp);
    return _.filter(tmp, function(e){
      return e._id !== Meteor.userId();
    });
  },
  getUsr: function(){
    return this.emails[0].address;
  },
  activeUser: function(){
    if(this.activeUser === Meteor.userId()){
      return 'Active User';
    }else{
      return 'WAITING';
    }
  },
  ansList: function () {
    var ans = Qns.find({},{limit : 1}).fetch();
    var au = this.activeUser;
    ans.map(function(e){
      if (au !== Meteor.userId()){e.type = 'makeWrongAns';}
      else{e.type = 'quizCard';}
      return e;
    });
    return ans;
  }
});


Template.room.events({
  "click button#makeActive": function(event, template){
    Meteor.call('updateRoomActiveUser',template.data._id,Meteor.userId());
  },
  "click button#cycle": function(event, template){
    Meteor.call('cycleActiveUser',template.data._id);
  }
});
