 $(document).ready(function(){
        var $body = $('body');
        $body.html('');
		var $div1 = $('<div class = "block"></div>');
		$div1.appendTo($body);
		var $button = $('<input type = "button" class="btn btn-primary" value = "New Tweets" />');
		$button.appendTo($body);
		var $div2 = $('<div class = "block"></div>');
		$div2.appendTo($body);		
		var length = 0;
		var alternate = true;
		
        var getTweets = function(){
			var index = streams.home.length - 1;		
			while(length < index){		 
				  var tweet = streams.home[length];				  
				  var $username = $('<span class = "username"><span>');
				  var time = getDate(tweet.created_at);			 
				  var $tweet = makeTweet($username, tweet,time);			  
				  $tweet.appendTo($div1);
				  ++length;
				  
				  $('.username').on('click',function(){
					   $div2.empty();
			           var username = $(this).text().substring(1);
			           getUserTweets(username);
		          });
			  
			}
		}
		
		var getUserTweets = function(username){
			var len = 0;
			var index = streams.users[username].length - 1;
			var tweets = streams.users[username];
			console.log(index);
			while(len < index){
				var tweet = tweets[len];
				var $username = $('<span class = "username"><span>');
				var time = getDate(tweet.created_at);			 
				var $tweet = makeTweet($username, tweet,time);
				$tweet.appendTo($div2);
				 ++len;
			}
		
		}
		
		var makeTweet = function($username, tweet,time){

		    var $tweet = (alternate) ? $('<p class="tweet"></p>') : $('<p class="tweet gray"></p>') ;
		    alternate = !alternate;
			$tweet.text(' ' + time + ': ' + tweet.message);
			$username.text('@' + tweet.user);
			$tweet.prepend($username);				  
			$tweet.appendTo($div2);
			
			return $tweet;
		}
		
		var getDate = function(date){
			var months = date.getMonth();
		    var year = date.getFullYear();
			var day = date.getDate();
			var hour = date.getHours();
			var min = ('0' + date.getMinutes()).slice(-2);
			var time_of_day = (12 - hour) > 0 ? ' am' : ' pm'; 		  
			
			return months + '/' + day + '/' + year + ' \u2022 ' + Math.abs(hour - 12) + ':' + min + time_of_day;	
		
		}
		
		
		
		$button.on('click',function(){
			getTweets();		
		});
		
		getTweets();
		
		
		
      });