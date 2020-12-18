$(document).ready(function() {
  let counter;
  $("#tweet-text").on('input', function() {
    counter = 140 - $(this).val().length;
    $("#counter").text(counter);
    if (counter < 0) {
      document.getElementById("counter").style.color = 'red';
    } else document.getElementById("counter").style.color = 'black';
  });
});