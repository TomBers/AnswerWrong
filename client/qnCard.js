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
  this.data.wa = new WrongAns(this.data._id,Meteor.userId(),this.data.ans);
  // console.log(this.data);
})

// Template.qnCard.onCreated(function(){
//     this.data.wa = new WrongAns(this.data._id,Meteor.userId(),this.data.ans);
//     // console.log(this.data);
// });


Template.qnCard.events({
  "click .qnCardContainer":function(e,t){
    var tmp = this;
    var isSmall = Session.get(this._id+'_QisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ height: "400px",width:"400px", backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)},{duration:2000})
    .then(function(ele) {
      Session.set(tmp._id+'_QisSmall', false); });
  }else{
    // Velocity(e.currentTarget,{ height: "50px",width:"50px"},
    // {duration:2000,begin: function(elements) { Session.set(tmp._id+'_QisSmall', true); }});
  }
  },
  "keyup .wrongAnsTxt":function(e,t){

    if (typeof this.wa === "undefined"){
      this.wa = new WrongAns(this._id,Meteor.userId(),this.ans);
    }
    this.wa.updateDist(e.target.value);
    Session.set(this._id,this.wa.answerDist);
  },
    "submit .new-wrongAns": function (event,t) {
      // Prevent default browser form submit
      event.preventDefault();
      if(this.wa.ans.length >= 1){
      this.wa.commitToDb();
      // console.log(this);
      // Clear form
      var tmp = Session.get('seenQns');
      tmp.push(this._id);
      Session.set('seenQns',tmp);
    }
      // event.target.wrongAns.value = "";
    }
  });
