---
layout: article
title: Introducing EspnRb
description: Announcing EspnRb my wrapper around the ESPN developer API.  It covers some basic usage examples and where you can learn more about it.
permalink: /introducing-espn-rb.html
---

# {{ page.title }}

{% include _twitter_share.html %}

<span  style="font-size:12px;">For those who found this via Reddit here is a <a href="https://github.com/rondale-sc/EspnRb">link to the repository</a>.</span>

###EspnRb ('ESPN-ar-bee')

Since its release I've been working on creating a Ruby wrapper for the ESPN api.  I began because it sounded fun to fiddle around with sports data for a change.  And.. It was, I've had a blast building EspnRb.  EspnRb allows you to use the Espn API with all that Ruby goodness we all know and love.  Here I'll very briefly walk you through installation and getting the espn credentials, then we'll dive straight into some EspnRb examples.

![ESPN api logo](http://a.espncdn.com/i/apis/attribution/espn-api-black_200.png "See more branding options at developer.espn.com/branding")

### ESPN api

In order to use the espn api you must have an api key.  Your api key can be requested at the ESPN developer center website [[1]](http://developer.espn.com/member/register).  Just fill out the form and they'll assign you a key.  Important note: the use of ESPN's api requires an attribution link (like above) which can be found [here](http://developer.espn.com/branding).  The attribution links look pretty good and range from 50 by 14px to 200 by 75px, so finding one that fits your use shouldn't be too hard. Once you have the key you can begin working with EspnRb.

### Installation

{% gist 2156594 gist-1.rb %}

### Use it

The easiest way to set your api key for use with espn_rb is to export it as an environment variable. Do that like so:

{% gist 2156594 gist-2.sh %}

### Get the headlines

{% gist 2156594 gist-3.rb %}

### HeadlineResponse

{% gist 2156594 gist-4.rb %}

### HeadlineItem

The HeadlineResponse Object holds in it the contens of the ESPN JSON response  split into HeadlineItems.  Here is where you can get Specific information about each story.  Some of the options are:

{% gist 2156594 gist-5.rb %}

There is a lot more inside the gem, be sure to check out the source.  ^_^

### Documentation

So far I've built up a decent little readme [[2]](https://github.com/rondale-sc/EspnRb) and there are YARD docs [[3]](http://rubydoc.info/gems/espn_rb). I'm also available if you need any help just ping me on [github](https://github.com/rondale-sc).

### Conclusions

An example of espn_rb can be found [here](http://espn-api-samples.heroku.com/headlines).  It was created by Brian Jackson, a developer at ESPN.com ([@jaxzin](http://about.me/jaxzin)), and he plans to expand the examples over the next little while, so be sure to check back.

This is just a start. I hope to expand this gem to encompass more and more of the ESPN functionality.  The folks at ESPN have done a good job of making their data available. I've had a lot of fun working on this project so far, and I hope you guys find some use for it.  ^_^

#### References

<span  style="font-size:12px;">1.[Register for ESPN api key](http://developer.espn.com/member/register)</span><br/>
<span  style="font-size:12px;">2.[Main EspnRb Repository](https://github.com/rondale-sc/EspnRb)</span><br/>
<span  style="font-size:12px;">3.[Yard for EspnRb](http://rubydoc.info/gems/espn_rb)</span><br/>

####Additional References
<span style="font-size:12px;">[@jaxzin's example page](http://espn-api-samples.heroku.com/headlines)</span>