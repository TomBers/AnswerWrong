Template.makeQn.events({
    "submit .newQn": function (event,t) {
      // Prevent default browser form submit
      event.preventDefault();

      var qn = event.target.qn.value;
      var ans = event.target.ans.value;

      var qn = new Qn(qn,ans);
      qn.commitToDb();
      // Clear form
      event.target.qn.value = "";
      event.target.ans.value = "";
    }
  });
