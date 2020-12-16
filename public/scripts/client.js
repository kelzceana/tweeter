/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $htmltweet = createTweetElement(tweet);
      $('#tweets-container').append($htmltweet)
    }
  };

  const createTweetElement = function(tweetData) {
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
      <p>${tweetData['content'].text}</p>
   </div>
   <hr class="line">
    <footer class="footer">
    
     <p>${tweetData['created_at']}</p>
      <div>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
     </div>
    </footer>
  </article>`;

  return tweetArticle;
 };
 
 // AJAX POST for submit button
 
 $(function() {
  const $form = $("#newtweet")
  $form.submit(function(event) {
    event.preventDefault();
    const tweetcontent = $(this).children("#tweet-text")
    console.log(tweetcontent)
    $.ajax({
      method: 'POST',
      url: "/tweets",
      data: $(this).serialize()
    }).then(res => {
      console.log(res)
    })
    
  });

  // function to load tweets from the server
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
      console.log('success',data)
    })
    .then(function (tweetdata) {
      renderTweets(tweetdata)
    })
  };
  loadTweets()
 });
 
 