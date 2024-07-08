//wait until html has finished loading
$(document).ready(function() {
console.log('composer-char-counter.js ready!')

//set up event listener for typing in new-tweet textarea
$('.new-tweet textarea').on('input', function() {
  const maxLength = 140;
  const currentLength = $(this).val().length;
  const remainingLength = maxLength - currentLength;

  //add check to stop counter at 0
  if (remainingLength < 0) {
    remainingLength = 0;
  }
  
  //update text as user types
  const counter = $(this).parent().find('.counter');
  counter.text(remainingLength);

//add zero class for styling if counter is 0
  if (remainingLength === 0) {
    counter.addClass('zero');
  } else {
    counter.removeClass('zero');
  }
});
});