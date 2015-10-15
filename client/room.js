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
    // console.log(this);
    return this.emails[0].address + ' ' + this.gameState;
  },
  ansList: function () {
    var ans = Qns.find({},{limit : 1}).fetch();
    var gs = Meteor.users.findOne({_id:Meteor.userId()}).gameState;

    switch (gs) {
      case 'CA': {
        ans.map(function(e){ e.type = 'makeWrongAns'; e.drawTemplate = true; return e;});
        return ans;
      }
        break;
        case 'AQ':  {
          ans.map(function(e){ e.type = 'quizCard'; e.drawTemplate = true; return e;});
          return ans;
        }
          break;
      default: {
        ans.map(function(e){ e.msg = 'Waiting for other players'; e.drawTemplate = false; return e;});
      return ans;
    }
  }
}
});


Template.room.events({
  "click button#makeActive": function(event, template){
    Meteor.call('updateRoomActiveUser',template.data._id,Meteor.userId());
  }
});
