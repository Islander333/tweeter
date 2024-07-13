/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const renderTweets = function(tweets) {
  //clear tweets before rendering new ones
  $('.tweets-container').empty();
// loops through tweets
tweets.forEach(tweet => {
// calls createTweetElement for each tweet
const tweetElement = createTweetElement(tweet)
// takes return value and appends it to the tweets container
$('.tweets-container').prepend(tweetElement);
});
};

const createTweetElement = function(tweet) {
let $tweet = $(`<article class="tweet">
  <div class="tweets-header">
    <div class="tweets-header-left">
      <i class="fa-solid fa-user"></i>
    <h3>${tweet.user.name}</h3>
    </div>
    <span>${tweet.user.handle}</span>
  </div>
  <div class="tweet-content">
    <p> ${tweet.content.text}</p>
  </div>
  <footer>
    <span>${timeago.format(tweet.created_at)}</span>
    <div class="tweet-actions">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`)
return $tweet;
}

//document ready
$(document).ready(function() {
  //implement loadTweets function
  const loadTweets = function() {
    //make ajax get request to /tweets
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    });
  };

  //call loadTweets function to load the tweets
  loadTweets();
  

  //event listener for submit
  $('form').on('submit', function(event) {
    //prevent default form submission
    event.preventDefault();
    console.log('form submission prevented');

    //get the text
    const tweetText = $('#tweet-text').val().trim();

    //form validations
    if (!tweetText) {
      alert('Tweet cannot be empty.');
      return;
    }

    if (tweetText.length > 140) {
      alert('Tweet content exceeds 140 characters.')
    }

     //serialize form data
     const serializedData = $(this).serialize();

     //submit post request with serialized data
     $.post('/tweets/', serializedData, function() {
      //reload tweet after submission and clear tweet text
      loadTweets();
      $('#tweet-text').val('');
     });
});
});


   





