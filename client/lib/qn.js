Qn = function (qn,ans) {
  this.qn = qn;
  this.ans = ans;
  this.qnId = 0;
  this.ownerId = Meteor.userId();
};

Qn.prototype.commitToDb = function(){
  Meteor.call("addQn", this, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
       if(result.insertedId){
         this.qnId = result.insertedId;
       }
    }
  });
}
