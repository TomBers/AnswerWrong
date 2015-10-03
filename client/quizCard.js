Template.quizCard.onCreated(function(){
  Session.set(this.data.qnId+'_selected', '');
  Session.set(this.data._id+'_AisSmall', true);
});


Template.quizCard.helpers({
  getAns: function(){
    rand = Math.random();
    var wa = WrongAnswers.find({qnId:this._id},{limit:5,sort: {choosen:1}}).fetch();
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

Template.quizCard.events({
  "click .makeWrongAnsContainer":function(e,t){
    var tmp = this;
    var isSmall = Session.get(this._id+'_AisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ minHeight:'500px',height: ['500px','50px'],width:["500px","50px"],backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)},{duration:2000})
    .then(function(ele) {Session.set(tmp._id+'_AisSmall', false);});
  }else{
    // Velocity(e.currentTarget,{ height: "50px",width:"50px"},
    // {duration:2000,begin: function(elements) { Session.set(tmp._id+'_AisSmall', true); }});
  }
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
    Meteor.call("updateViews", Template.parentData().waID, function(error, result){
      if(error){
        console.log("error", error);
      }
      });


      var pid = Template.parentData()._id;

      if (typeof this.correctAns !== "undefined" && this.correctAns === this.ans){
        alert('Correct');
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
            alert('Good Try - But Wrong');
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
