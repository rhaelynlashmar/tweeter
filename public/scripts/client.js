/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

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
        <p>${content.text}</p>
      </section>
      <footer>
        <div class="tweet-timestamp">
          <p>${created_at}t</p>
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

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);