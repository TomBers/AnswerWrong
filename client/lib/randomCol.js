RandomCol = function(){
  var colArray = ['1B325F','9CC4E4','3A89C9','F26C4F','E21B5A','9E0C39','333333','83A300'];
  this.col = '#'+colArray[Math.floor(Math.random() * 8)];
};
RandomCol.prototype.getCol = function(){
  return this.col;
}
