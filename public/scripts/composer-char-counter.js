$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let tweetLength = $(this).val().length;
    let counter = 140 - tweetLength;
    let counterElement = $(this).siblings('.tweet-footer').children('.counter');

    counterElement.text(counter);

    if (counter < 0) {
      counterElement.addClass('counter-red-text');
    }
    else {
      counterElement.removeClass('counter-red-text');
    }
  });
});