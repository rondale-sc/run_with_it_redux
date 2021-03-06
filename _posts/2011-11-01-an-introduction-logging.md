---
layout: article
title: An Introduction to Logging
description: In this screencast I'll give you a brief introduction to the Logging framework.  It's a popular logging tool that allows for greater transparency in your applications.
permalink: /an-introduction-to-logging.html
---

# {{ page.title }}

{% include _twitter_share.html %}

<iframe src="http://player.vimeo.com/video/31431112?title=0&amp;byline=0&amp;portrait=0" width="630" height="394" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>

###Installation

{% gist 2156472 gist-1.sh %}

###Features
Here we create individual logging objects rather than one monstrous global logger [[1]](https://github.com/TwP/logging/blob/master/examples/loggers.rb).  Once they have been individually created you can customize the behavior of each.

{% gist 2156472 gist-2.rb %}

Here we use multiple appenders [[2]](https://github.com/TwP/logging/blob/master/examples/appenders.rb). Appenders allow you to shunt your logging messages to different output media.  Here we set our messages to log to standard out and to a file.

{% gist 2156472 gist-3.rb %}

Here we create log objects at initialization of class Foo and Foo::Bar [[3]](https://github.com/TwP/logging/blob/master/examples/classes.rb).  Once we've done that we can refine our logging parameters to reveal behavior specific to each class.

{% gist 2156472 gist-4.rb %}

###Incorporating Rails

Incorporate rails easily with the logging-rails gem [[4]](https://github.com/TwP/logging-rails).

{% gist 2156472 gist-5.rb %}

### Thanks for Watching

This was my first screen-cast so thank you for bearing with me.  The production quality on my next cast should be markedly increased as I have learned much by making this one.  The Logging framework has a lot to offer and I hope that you've found this helpful.  Thanks.


#### References
<span  style="font-size:12px;">1.) [Custom Loggers](https://github.com/TwP/logging/blob/master/examples/loggers.rb)</span><br/>
<span  style="font-size:12px;">2.) [Appenders](https://github.com/TwP/logging/blob/master/examples/appenders.rb)</span><br/>
<span  style="font-size:12px;">3.) [Class Loggers](https://github.com/TwP/logging/blob/master/examples/classes.rb)</span><br/>
<span  style="font-size:12px;">4.) [logging-rails](https://github.com/TwP/logging-rails)</span><br/>

#### Additional References
<span style="font-size:12px;">[TWP Logging GitHub](https://github.com/TwP/logging)</span><br/>
<span style="font-size:12px;">[Ruby Rogues episode 025](http://rubyrogues.com/025-rr-logging-i-do-not-think-it-means-what-you-think-it-means/)</span><br/>
<span style="font-size:12px;">[Scroll Blindness](http://c2.com/cgi/wiki?ScrollBlindness)</span><br/>
<span style="font-size:12px;">[Pry an alternative to IRB](http://pry.github.com/)</span><br/>
<span style="font-size:12px;">[Extending Rails 3 with Railties, 2010](http://www.engineyard.com/blog/2010/extending-rails-3-with-railties/)</span><br/>