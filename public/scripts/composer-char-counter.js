$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let tweetLength = $(this).val().length;
    let counter = 140 - tweetLength;
    let counterElement = $(this).siblings('.tweet-footer').children('.counter');

    counterElement.val(counter);

    if (counter < 0) {
      counterElement.addClass('red-text');
    }
    else {
      counterElement.removeClass('red-text');
    }
  });
});