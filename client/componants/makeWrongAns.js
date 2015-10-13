Template.makeWrongAns.helpers({
  wordDist: function(){
    return Session.get(this._id) || 'No Score';
  },
  isSmall:function(){
    return Session.get(this._id+'_QisSmall');
  }
});

Template.makeWrongAns.onRendered(function () {
  // console.log(this);
  Session.set(this.data._id+'_QisSmall', true);
  this.data.wa = new WrongAns(this.data._id,this.data.ans,Session.get('room'));
  // console.log(this.data);
})

// Template.makeWrongAns.onCreated(function(){
//     this.data.wa = new WrongAns(this.data._id,Meteor.userId(),this.data.ans);
//     // console.log(this.data);
// });


Template.makeWrongAns.events({
  "click .makeWrongAnsContainer":function(e,t){
    var tmp = this;
    var isSmall = Session.get(this._id+'_QisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ minHeight:'500px',height: ['500px','50px'],width:["500px","50px"], backgroundColor:new RandomCol().getCol()},{duration:1000})
    .then(function(ele) {
      Session.set(tmp._id+'_QisSmall', false); });
  }
  // else{
    // Velocity(e.currentTarget,{ height: "50px",width:"50px"},
    // {duration:2000,begin: function(elements) { Session.set(tmp._id+'_QisSmall', true); }});
  // }
  },
  "keyup .wrongAnsTxt":function(e,t){

    if (typeof this.wa === "undefined"){
      this.wa = new WrongAns(this._id,Meteor.userId(),this.ans);
    }
    Session.set(this._id,this.wa.updateScore(e.target.value));
  },
    "submit .new-wrongAns": function (event,t) {
      // Prevent default browser form submit
      event.preventDefault();
      if(this.wa.isValidAns()){
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
