/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const renderTweets = function(tweets) {
// loops through tweets
tweets.forEach(tweet => {
// calls createTweetElement for each tweet
const tweetElement = createTweetElement(tweet)
// takes return value and appends it to the tweets container
$('.tweets-container').append(tweetElement);
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

     //serialize form data
     const serializedData = $(this).serialize();

     //submit post request with serialized data
     $.post('/tweets/', serializedData);
});
});


   





