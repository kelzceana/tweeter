/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $htmltweet = createTweetElement(tweet);
    $('#tweets-container').prepend($htmltweet);
  }
};

//Convert JSON date to normal date and get time since tweet was madee3cx
const timesince = function(jsonDate) {
  const sec = Math.floor((new Date() - jsonDate) / 1000);
  let interval = Math.floor(sec / 31536000);
  if (interval > 1) {
    return interval + 'years';
  }
  interval = Math.floor(sec / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(sec / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(sec / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(sec / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(sec) + " seconds";
};


const createTweetElement = function(tweetData) {
  // convert data to safe data
  const safeHTML = `<p>${escape(tweetData['content'].text)}</p>`;
  // using jquery to create a DOM object
  const tweetArticle = `<article class="tweet"> 
    <header>
      <div class="tweet-icon">
      <img class="icon" src=${tweetData['user'].avatars}>
      <p>${tweetData['user'].name}</p>
      </div>
      <div><p>${tweetData['user'].handle}</p></div>
    </header>
    <div class="tweet-body">
      ${safeHTML}
   </div>
   <hr class="line">
    <footer class="footer">
    
     <p>${timesince(tweetData['created_at']) + "   ago"}</p>
      <div>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
     </div>
    </footer>
  </article>`;

  return tweetArticle;
};
 
//handle XSS edge case
const escape =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

// AJAX POST for submit button
 
$(function() {
  const $form = $("#newtweet");
  $form.submit(function(event)  {
    event.preventDefault();
    const tweetcontent = $(this).children("#tweet-text");
    if (!tweetcontent.val() || tweetcontent.val() === null) {
      $("#error").html("!!! Whats Tweeter without a tweet?");
      $("#error").addClass("errormessage");
    } else if (tweetcontent.val().length > 140) {
      $("#error").html("!!! Tweet too long");
      $("#error").addClass("errormessage");
    } else {
      $("#error").html("");
      $("#error").removeClass("errormessage");
      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: $(this).serialize()
      }).then(res => {
        $("textarea").val("");
        loadTweets();
        $("#counter").val(140)
      });
    }
  });

  // function to load tweets from the server
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
    }).then(function (tweetdata) {
      renderTweets(tweetdata);
    });
  };
  loadTweets();
});
 
 