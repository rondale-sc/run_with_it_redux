---
layout: article
title: Make the most of your tweet
description: Here I'll show you how to integrate google's url shortening service, and Twitter's tweet button to help make your site's tweet a little more friendly.
permalink: /make-the-most-of-your-tweet.html
---

# {{ page.title }}

{% include _twitter_share.html %}

Twitter's 'Tweet Button' has become the standard for websites and blogs around the internet. Yeah, it's that little button to the right of this paragraph. <img alt="twitter bird" src="http://www.jonathan-jackson.net/assets/single_bird.png" style="vertical-align:bottom;float:left"/> Run with it (this blog) has had that implemented since day one thanks in large part to the fact that Twitter makes including the button really simple.  Just grab the snippet of code and throw it into your html.  It took me a little while to realize that the default settings, while great for getting you up and running, do not result in the prettiest of tweets.  Here I'll walk you through how to utilize google's url shortener, and get the basic Tweet Button functionality down.

<br/><br/>

## Fundamentals

Twitter allows you to include the button with an iframe or via a snippet of javascript.  I'm going to walk through the javascript setup because it's the most convenient and it's also what Twitter recommends.  If you go to the [Twitter Button](https://twitter.com/about/resources/tweetbutton) resource page you'll be given a set of options to configure your Tweet Button.  Once you've figure out how you want it laid out you should have something that looks like this.

{% gist 2156432 gist-1.html %}

This is the basic outline for a tweet button.  The _data_ attributes allow you to customize the behavior of your button.  We'll focus on these [[1]](https://dev.twitter.com/docs/tweet-button):

* _via_ - Screen name of the user to attribute the Tweet to
* _count_ - Count box position
* _counturl_ - The URL to which your shared URL resolves to
* _url_ - URL of the page to share

But before we get to that we need to get set up.

## Shortening


First things first, generate a migration to add a short_url field to your Article/Post table (I'm going to assume a blog style app).


    bundle exec rails g migration add_short_url_to_articles short_url:string
    bundle exec rake db:migrate


Once that's done we can go into the Article model and get to the important stuff.

{% gist 2156432 gist-2.rb %}

Now you'll immediately notice a few things about the above code.  First is the use of ssl.  Do it [[2]](http://www.rubyinside.com/how-to-cure-nethttps-risky-default-https-behavior-4010.html). I've snagged the curl PEM [[3]](http://curl.haxx.se/ca/cacert.pem) which is a reliable authority and stored it in /lib/cacert.pem. Also set the `verify_mode` to OpenSSL::SSL::VERIFY_PEER.  The rest is pretty [vanilla net/http stuff](https://github.com/augustl/net-http-cheat-sheet).

The next thing you'll notice is the line directly under that, which is where I read in my google api key to keep it out of source control.  It makes sense to add an after hook on your cap-deploy script to link to a share location on your production server and then add the file to your ./gitignore. Strictly speaking [goo.gl](http://goo.gl/) does not require that you submit an api key for url shortening, but it lets you track the urls if you do.

## Bringing it back around

Alright so now you have the short url for your site we'll come back to our Tweet Button.  Only now we'll set the _data-url_ to our short url.  Not so fast!  We also have to set the _data-counturl_ to the original url so that your count bubble will be accurate.

{% gist 2156432 gist-3.erb %}

Now we have a decent looking tweet.  It's going to use your &lt;title&gt; for your text by default.  I think this is a great default as it encourages you to use the &lt;title&gt; properly.  I think the easiest way of setting your title tag is to set '<%= yield :head %>' in your layout's &lt;head&gt; tag then:

{% gist 2156432 gist-4.erb %}

And there you have it a nice looking tweet.

<img src="http://www.jonathan-jackson.net/assets/share_tweet_screen_shot.png"/>

## Wrap up

Alright, so there you have it a quick and relatively painless way to spruce up your website.  There are a number of additional things you can do to further customize your Tweet Button so I encourage you to take a look at the api page which is linked below.  If you have you have any questions or ideas let me know in the comments below, or tweet me.  Thanks for reading.

#### References
<span  style="font-size:12px;">1.) [Tweet Button Docs](https://dev.twitter.com/docs/tweet-button)</span><br/>
<span  style="font-size:12px;">2.) [Use HTTPS, 2010](http://www.rubyinside.com/how-to-cure-nethttps-risky-default-https-behavior-4010.html)</span><br/>
<span  style="font-size:12px;">3.) [Curl PEM](http://curl.haxx.se/ca/cacert.pem)</span><br/>

#### Additional References
<span style="font-size:12px;">[Net HTTP cheat sheet](https://github.com/augustl/net-http-cheat-sheet)</span><br/>
<span style="font-size:12px;">[Google Shortener Getting Started](http://code.google.com/apis/urlshortener/v1/getting_started.html)</span><br/>
