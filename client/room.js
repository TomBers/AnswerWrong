Template.room.onRendered(function(){
  var room = this.data._id;
  Session.set(room,[]);
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
 }
});


Template.room.events({
  "click button": function(event, template){
    console.log(template.data);
    console.log(Session.get(template.data._id));
    // console.log(Meteor.userId());

  }
});
