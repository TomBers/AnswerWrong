Template.qnCard.helpers({
  wordDist: function(){
    return Session.get(this._id) || 0;
  },
  isSmall:function(){
    return Session.get(this._id+'_QisSmall');
  }
});

Template.qnCard.onRendered(function () {
  // console.log(this);
  Session.setDefault(this.data._id+'_QisSmall', true);
})

Template.qnCard.onCreated(function(){
    this.data.wa = new WrongAns(this.data._id,Meteor.userId(),this.data.ans);
});


Template.qnCard.events({
  "click .qnCardContainer":function(e,t){
    var tmp = this;
    var isSmall = Session.get(this._id+'_QisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ height: "400px",width:"400px"},{duration:2000})
    .then(function(ele) { Session.set(tmp._id+'_QisSmall', false); });
  }else{
    // Velocity(e.currentTarget,{ height: "50px",width:"50px"},
    // {duration:2000,begin: function(elements) { Session.set(tmp._id+'_QisSmall', true); }});
  }
  },
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
