Template.ansCard.onCreated(function(){
  Session.setDefault(this.data.qnId+'_selected', '');
});

Template.ansCard.onRendered(function(){
  Meteor.call("updateViews", this.data.waID, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      //  console.log(result);
    }
  });
});

Template.ansCard.helpers({
  getQn: function(){
    return Qns.findOne().qn;
  },
  getAns: function(){
    var wa = WrongAnswers.find({qnId:this._id});
    this['waID'] = wa.fetch().map(function(obj){return obj._id});
    return wa;
  }
});

Template.ansItem.helpers({
  checked: function(){
    if(Session.get(this.qnId+'_selected') === this._id){return 'checked';}
  }
});


Template.ansItem.events({
  "click .ansItem":function(e,t){
    Session.set(t.data.qnId+'_selected',t.data._id);
  },
  "click .ansItem.checked":function(e,t){
    console.log(t.data._id);
    Meteor.call("updateChoosenAnswer", t.data._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        // console.log(result);
        // alert('Thanks');
      }
    });

  }
  });
