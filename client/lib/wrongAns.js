WrongAns = function (qnId,correctAns){
  this._id = Math.random();
  this.qnId = qnId;
  this.ownerId = Meteor.userId();
  this.correctAns = correctAns;
  this.ans = "";
  this.views = 0;
  this.choosen = 0;
  this.score = '';
}

WrongAns.prototype.setAns = function(wrongAns){
  this.ans = wrongAns;
}

WrongAns.prototype.updateScore = function(wrongAns){
  this.ans = wrongAns;
  // function to see how similar wrong answer is to right answer
if(wrongAns.length === 0){this.score = 'No Score';}

  var t = levDist(this.correctAns.toLowerCase(),wrongAns.toLowerCase());
  if(t !== 0){
  var dist = 1-(t/this.correctAns.length);
  if(dist < 0.35){
    this.score = 5;
    return 'High';
  }else if(dist < 0.65){
    this.score = 3;
    return "Medium";
  }else if(dist < 0.9){
    this.score = 1;
    return "Low";
  }else{
    this.score = -1;
    return 'Too Similar';
  }
}

}

WrongAns.prototype.isValidAns = function(){
  if(this.ans.length >= 1 && this.score !== -1){
    return true;
  }else{
    return false;
  }
}

WrongAns.prototype.commitToDb = function(){
  Meteor.call("addWrongAns", this, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){

    }
  });
}

function levDist(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    // Step 7
    return d[n][m];
}
