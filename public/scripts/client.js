/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to escape text + sanitize user generated code
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

  //function to display error messages
  const errorMessages = function(message) {
    const $errorElement = $('.error-message');
    //show err with slidedown animation
    $errorElement.text(message).slideDown();
   };

   //function to hide error messages
   const hideErrorMessages = function() {
    const $errorElement = $('.error-message');
    $errorElement.slideUp();
   }

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
    <h3>${escape(tweet.user.name)}</h3>
    </div>
    <span>${escape(tweet.user.handle)}</span>
  </div>
  <div class="tweet-content">
    <p> ${escape(tweet.content.text)}</p>
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
    $.get('/tweets')
    .done(function(tweets) {
      renderTweets(tweets);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    const statusCode = jqXHR.status;
    errorMessages(`Failed to load tweets: ${textStatus} (Status Code: ${statusCode})`);
    console.error(`${textStatus}`, errorThrown);
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
      errorMessages('Tweet cannot be empty.');
      return;
    }

    if (tweetText.length > 140) {
      errorMessages('Tweet cannot exceed 140 characters.')
      return;
    }

     //serialize form data
     const serializedData = $(this).serialize();

     //submit post request with serialized data
     $.post('/tweets/', serializedData)
      .done(function() {
      //reload tweet after submission and clear tweet text
       $('#tweet-text').val('');
      hideErrorMessages();
      loadTweets();
      //reset char counter to 140
      $('.counter').text('140').removeClass('zero');
     })
     .fail(function(jqXHR, textStatus, errorThrown) {
      const statusCode = jqXHR.status;
      errorMessages(`Failed to post tweet: ${textStatus}, Status code: ${statusCode}`);
      console.error(`Error: ${textStatus}`, errorThrown);
     })
});

$('.compose-button').on('click', function() {
  //toggle visibility of new-tweet
  $('.new-tweet').slideToggle();
});


//show or hide scroll-top button based on position
$(window).on('scroll', function() {
  if ($(window).scrollTop() > 100) {
    $('.scroll-top-button').fadeIn();
  } else {
    $('.scroll-top-button').fadeOut();
  }
});

//scroll to top and show text area when scroll-top button clicked
$('.scroll-top-button').on('click', function() {
  $('html, body').animate({ scrollTop: 0 }, 'fast', function() {
    $('.new-tweet').slideDown('fast', function() {
      $('#tweet-text').focus();
    });
  });
});



});


   





