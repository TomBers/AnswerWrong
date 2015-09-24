Router.configure({
layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'AnswerWrong'
  });
  this.route('/make', {
    path: '/make',
    template: 'makeQn'
  });

})
