$(function() {
  var scrollSpySelector = $('#content h1');

  $(scrollSpySelector).on('scrollSpy:enter', function() {
    console.log('enter:', $(this).attr('id'));
  });

  $(scrollSpySelector).on('scrollSpy:exit', function() {
    console.log('exit:', $(this).attr('id'));
  });

  $(scrollSpySelector).scrollSpy();
});