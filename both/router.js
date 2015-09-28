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
  this.route('/myWrongAnswers', {
    path: '/myWrongAnswers',
    template: 'myWrongAnswers'
  });
  this.route('/addWrongAnswer', {
    path: '/addWrongAnswer',
    template: 'addWrongAnswer'
  });




})
