var TwitterPackage = require('twitter');

var secret = {
  consumer_key: 'HIDDEN',
  consumer_secret: 'HIDDEN',
  access_token_key: 'HIDDEN',
  access_token_secret: 'HIDDEN'
}

var Twitter = new TwitterPackage(secret);

var query = "hockey";
Twitter.get('search/tweets', {q: query, count: 10, lang:"en"}, function(error, tweets, response) {

   var tweet_list = tweets['statuses'];

   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        }
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " any thoughts on the Pittsburgh Penguins?";
        var tweet_id = tweet_list[i].id_str

        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!")
            });
        }

        catch(err) {
            console.log(err);
        }
   }
});
