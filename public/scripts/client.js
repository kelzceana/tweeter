/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 const tweetData = [
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
 
 $(function() {
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
 renderTweets(tweetData)
 // AJAX POST for submit button


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

  })
 });
 
 