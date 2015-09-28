Template.quizCard.onCreated(function(){
  Session.setDefault(this.data.qnId+'_selected', '');
});

Template.quizCard.onRendered(function(){
  Session.setDefault(this.data._id+'_AisSmall', true);
  Meteor.call("updateViews", this.data.waID, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      //  console.log(result);
    }
  });
});

Template.quizCard.helpers({
  getAns: function(){
    rand = Math.random();
    var wa = WrongAnswers.find({qnId:this._id},{limit:3,sort: {choosen:1}}).fetch();
    this.waID = wa.map(function(obj){return obj._id});
    var tra = new WrongAns(this._id,this.ans);
    tra.updateDist(this.ans);
    wa.push(tra);

    return shuffle(wa);
  },
  isASmall:function(){

    return Session.get(this._id+'_AisSmall');
  }
});

Template.quizCard.events({
  "click .makeWrongAnsContainer":function(e,t){
    // console.log(this._id);
    var tmp = this;
    var isSmall = Session.get(this._id+'_AisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ minHeight:'500px',height: "50%",width:"48%",backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)},{duration:2000})
    .then(function(ele) { Session.set(tmp._id+'_AisSmall', false); });
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

      if (typeof this.correctAns !== "undefined" && this.correctAns === this.ans){
        alert('Correct');
      }else{
        var pid = Template.parentData()._id;
        Meteor.call("updateChoosenAnswer", t.data._id, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
            // console.log(result);
            alert('Good Try - But Wrong');
            var tmp = Session.get('seenAns');
            tmp.push(pid);
            Session.set('seenAns',tmp);
          }
        });

      }
  }
  });

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
