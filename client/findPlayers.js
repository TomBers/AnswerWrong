Template.findPlayers.onRendered(function(){
  Meteor.subscribe('allOnlineUsers');
  Meteor.subscribe('Invites',Meteor.userId());
});

Template.findPlayers.helpers({
  onlineUsers: function(){
    return _.filter(Meteor.users.find().fetch(), function(e){
      return e._id !== Meteor.userId();
    });
  },
  getUsr: function(){
    return {id:this._id,name:this.emails[0].address};
  },
  invites:function(){
    return Invites.find();
  }
});


Template.findPlayers.events({
  "submit #invitePlayers": function(event, template){
    event.preventDefault();
    var selected = template.findAll( "input[type=checkbox]:checked");
   var invitedUsers = _.map(selected, function(item) {
     return item.defaultValue;
   });

   if(invitedUsers.length >= 0){
   Meteor.call('createRoom',Meteor.userId(), function(e,d){
        // console.log(d);
        Meteor.call('inviteUsers',invitedUsers,Meteor.userId(),d);
        Router.go('/room/'+d);
      });
    }
  }
});
