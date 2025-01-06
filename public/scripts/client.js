// escape function to prevent XSS
const escapeXSS = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

  const timeAgo = timeago.format(new Date(created_at));
  
  const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <span class="tweet-avatar">
          <img class="avatar1" src="${user.avatars}" alt="User avatar">
          <h4>${user.name}</h4>
        </span>
        <p class="user-handle">${user.handle}</p>
      </header>
      <section class="tweet-content">
        <p>${escapeXSS(content.text)}</p>
      </section>
      <footer>
        <div class="tweet-timestamp">
          <p>${timeAgo}</p>
        </div>
        <div class="tweet-actions">
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet;
};


// Loads page before running the following code
$(document).ready(function() {
  // Event listener for form submission
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default action for form submission
    $('#error-message').slideUp(); // Hide the error message before validation
    
    const tweetText = $(this).find('textarea').val().trim();
      
    // Error handling for empty tweet
    if (!tweetText) {
      $('#error-message').text('Cannot Post an Empty Tweet').slideDown();
      return;
    }

    // Error handling for tweet exceeding 140 characters
    if (tweetText.length > 140) {
      alert('Tweet cannot exceed 140 characters!');
      return;
    }

    // Create an AJAX POST request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {

        // Fetch the latest tweets and POST the new tweet
        loadTweets();
      },
      error: function(err) {
        console.error('Error posting tweet:', err); // Log error if POST request fails
      }
    });
  });

  // Function to load tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err);
      }
    });
  };

  // Function to render tweets
  const renderTweets = (tweets) => {
    $('#tweets-container').empty(); // Clear the container before rendering new tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); // prepend to display the latest tweet first
    }
    $('#tweet-text').val(''); // Clear the text box after rendering tweets
  };

  // Initial load of tweets
  loadTweets();
});







