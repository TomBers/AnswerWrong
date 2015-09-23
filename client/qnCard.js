Template.qnCard.helpers({
  wordDist: function(){
    return Session.get(this._id) || 0;
  }
});

Template.qnCard.onRendered(function () {
  // console.log(this);
})

Template.qnCard.onCreated(function(){
    this.data.wa = new WrongAns(this.data._id,Meteor.userId(),this.data.ans);
});


Template.qnCard.events({
  "keyup .wrongAnsTxt":function(e,t){
    this.wa.updateDist(e.target.value);
    Session.set(this._id,this.wa.answerDist);
  },
    "submit .new-wrongAns": function (event,t) {
      // Prevent default browser form submit
      event.preventDefault();
      this.wa.commitToDb();
      // Clear form
      event.target.wrongAns.value = "";
    }
  });
