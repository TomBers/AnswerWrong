Template.ansCard.onCreated(function(){
  Session.setDefault(this.data.qnId+'_selected', '');
});

Template.ansCard.onRendered(function(){
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

Template.ansCard.helpers({
  getAns: function(){
    var wa = WrongAnswers.find({qnId:this._id});
    this.waID = wa.fetch().map(function(obj){return obj._id});
    return wa;
  },
  isASmall:function(){
    return Session.get(this._id+'_AisSmall');
  }
});

Template.ansCard.events({
  "click .qnCardContainer":function(e,t){
    // console.log(this._id);
    var tmp = this;
    var isSmall = Session.get(this._id+'_AisSmall');
    if(isSmall){
    Velocity(e.currentTarget,{ height: "400px",width:"400px",backgroundColor:'#'+Math.floor(Math.random()*16777215).toString(16)},{duration:2000})
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
  }
});



Template.ansItem.events({
  "click .ansItem":function(e,t){
    Session.set(t.data.qnId+'_selected',t.data._id);
  },
  "click .ansItem.checked":function(e,t){

    var pid = Template.parentData()._id;
    // console.log(t.data._id);
    Meteor.call("updateChoosenAnswer", t.data._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        // console.log(result);
        alert('Thanks');
        var tmp = Session.get('seenAns');
        tmp.push(pid);
        Session.set('seenAns',tmp);
      }
    });

  }
  });
