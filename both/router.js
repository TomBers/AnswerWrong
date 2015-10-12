Router.configure({
layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'AnswerWrong'
  });
  this.route('/singlePlayer', {
    path: '/singlePlayer',
    template: 'singlePlayer'
  });

  this.route('/findPlayers', {
    path: '/findPlayers',
    template: 'findPlayers'
  });

  this.route('/about', {
    path: '/about',
    template: 'about'
  });

  this.route('room', {
  path: '/room/:_id',
  template: 'room',
  waitOn: function(){
    return Meteor.subscribe('Rooms',this.params._id);
  },
  data: function() {
    return Rooms.findOne({_id:this.params._id});
  }
});

  this.route('/make', {
    path: '/make',
    template: 'makeQn'
  });
  this.route('/myWrongAnswers', {
    path: '/myWrongAnswers',
    template: 'myWrongAnswers'
  });
  this.route('/addWrongAnswer', {
    path: '/addWrongAnswer',
    template: 'addWrongAnswer'
  });




})
