// Template.quizCard.onCreated(function(){
//
// });

Template.quizCard.onRendered(function(){

  Session.set(this.data._id+'_selected', '');
  Session.set(this.data._id+'_AisSmall', true);

// Make this subscribe more efficient at some point
  Meteor.subscribe('Ans');

  var tmp = this.data;
  Velocity(this.firstNode,{ minHeight:'500px',height: ['500px','50px'],width:["500px","50px"],backgroundColor:new RandomCol().getCol()},{duration:1000})
  .then(function(ele) {Session.set(tmp._id+'_AisSmall', false);});
});


Template.quizCard.helpers({
  getAns: function(){
    // rand = Math.random();
    // var wa = WrongAnswers.find({qnId:this._id},{limit:3,sort: {choosen:1}}).fetch();
    var r = Session.get('room');
    var n = 5;//Session.get('noOfAns');
    if(r !== ''){
      var wa = WrongAnswers.find({qnId:this._id,room:r},{limit:n,sort: {choosen:1}}).fetch();
      var tids = wa.map(function(e){
        return e._id;
      })
      if(wa.length < n){
        var l = n - wa.length;
        var tmp =  WrongAnswers.find({qnId:this._id, _id:{$nin:tids} },{limit:l,sort: {choosen:1}}).fetch();
        // Need to add a NIN function for id's so no duplicates
        wa.push.apply(wa,tmp);
      }
    }else{
      var wa = WrongAnswers.find({qnId:this._id},{limit:n,sort: {choosen:1}}).fetch();
    }


    this.waID = wa.map(function(obj){return obj._id});
    var tra = new WrongAns(this._id,this.ans);
    tra.setAns(this.ans);
    wa.push(tra);
    return shuffle(wa);
  },
  isASmall:function(){
    return Session.get(this._id+'_AisSmall');
  }
});


Template.ansItem.helpers({
  checked: function(){
    if(Session.get(this.qnId+'_selected') === this._id){return 'checked';}
    // else{return '';}
  }
});



Template.ansItem.events({
  "click .ansItem":function(e,t){
    Session.set(t.data.qnId+'_selected',t.data._id);
  },
  "click .ansItem.checked":function(e,t){
    // update Viewed Qns

    // console.log(Template.parentData().waID);
    Meteor.call("updateNoViewsAndCompleteTurn", Template.parentData().waID,Meteor.userId(),Session.get('room'),Template.parentData()._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      });

      var i = Session.get('noQns');
      Session.set('noQns',++i);
      var pid = Template.parentData()._id;

      if (typeof this.correctAns !== "undefined" && this.correctAns === this.ans){
        // alert('Correct');
        var c = Session.get('userScore') + 1;
        Session.set('userScore', c);
        removeQn(pid);
      }else{

        Meteor.call("updateChoosenAnswer", t.data._id, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
            // console.log(result);
            // alert('Good Try - But Wrong');
            removeQn(pid);
          }
        });

      }
  }
  });

  function removeQn(qid){
    var tmp = Session.get('seenAns');
    tmp.push(qid);
    Session.set('seenAns',tmp);
  }

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
