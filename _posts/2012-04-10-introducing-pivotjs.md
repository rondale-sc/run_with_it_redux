---
layout: article
description: Here I'll talk a little bit about Pivot.js a new reporting library that let's you create extremely flexible reports on the fly.
title: Introducing Pivot.js
---

# {{ page.title }}

{% include _twitter_share.html %}

Some of you are likely aware of the library I've been working on with [@rwjblue](https://twitter.com/#!/rwjblue) over the past few weeks.  The name of this library, as I'm sure you've (very cleverly) deduced is *Pivot.js*.  It allows you to create meaningful reports from large data sets quickly and (relatively) painlessly.  We've even created a nice little jQuery plugin that enables you to get running with very little effort. Let's go through why we built Pivot.js, and then get a pivot implemented.

## Why we built Pivot.js

In short, summarizing data can be a serious pain.  If you've ever attempted to get something usable from 30k rows of data before, you know just how difficult this can be.  For several years we've relied on MS Excel's pivot table functionality to create enterprise-wide analysis reports.  The learning curve behind setting up an Excel pivot table leaves something to be desired, and we found ourselves unable to share our reports with our clients without setting up a VPN (unless it was a snapshot/non-interactive). We finally realized how much time we spent maintaining this structure and decided it was worth it to invest in an alternative.  Enter Pivot.js.

## Meet Phil

Let's talk about Phil the web-savvy entrepreneur.  He has a site where he sells his homemade novelty sci-fi T-shirts.  His T-shirts have picked up sales over the past three months, breaking over a thousand sales per month.   He realizes that he'd like to create some custom reports to display his recent success and help him measure his performance.  He stumbles upon *Pivot.js* and starts creating a little Sinatra app that'll help him display some reports.

After reading up a little bit and requiring pivot.js in his `<head></head>`, he creates a new pivot based off his CSV.

{% gist 2347874 gist-1.js %}

He starts to play around with the pivot object in the console to see what it can do for him.

{% gist 2347874 gist-2.js %}

Realizing that he'll need to filter the data so that he doesn't get thousands of rows returned on all his reports, he delves a bit further into the documentation and finds some filter methods.

{% gist 2347874 gist-3.js %}

"Sweet!," exclaims Phil, realizing how easy that was.  He continues reading and sees that he can create custom fields to do all sorts of stuff, like determine the lag between order date and delivery date.

{% gist 2347874 gist-4.js %}

Now, he can render a report that would let him see average delivery_lag by t-shirt identifier.

{% gist 2347874 gist-5.js %}

"This is great, but how can I get this to a page?," Phil thinks.  He continues reading the README and gets to a section about jQuery integration.

## Phil gets to know jQuery_pivot

After going through the entire jQuery section, he begins implementing his pivot report into his Sinatra application.  He's already built a route for /delivery-lag-report.html and has a template going.  So after including `jquery.js` and `pivot.js` and `jquery_pivot.js` into the `<head>` of the layout, he dives right in and builds his pivot.

First, he adds a div for results that looks like `<div id="results"></div>` and a div for his menus `<div id="pivot-menu-container"></div>`.  Then, he calls jquery_pivot on his container by adding the following snippet to his index page:

{% gist 2347874 gist-6.js %}

When he loads the page, Phil is greeted with three drop-downs listing his filters, labels, and summaries.  After playing with the new drop-downs, he's ready to move on.  Phil wants a report to show delivery lag by T-shirt, but he doesn't want to have to click the filters, labels, and summaries every time he refreshes the page.  A little further digging into the jQuery pivot section, he sees that he can create prefabricated reports by selecting the fields/filters he wants displayed and using the pivot.config() method to easily retrieve a valid init object.

{% gist 2347874 gist-7.js %}

When he refreshes the page, Phil's report is already pre-set and the data is just the way he wanted it.  Hooray!

## Additional jQuery_pivot Options

jQuery pivot allows you to specify your own containers by including `skipBuildContainers: true` to the options object passed to 'setup'.  If you do this, you need to specify divs with ids: `filter-list`, `label-fields`, and `summary-fields`.  This allows you to more easily control how your layout behaves with jQuery_pivot.

Also, CSV may be passed in from a URL like so:

{% gist 2347874 gist-8.js %}

## Wrapping up

There you have it: Pivot and jQuery\_pivot should help you more easily create reports.  It has a long way to go, but I'm very excited about its direction.  We have plans to create a Rails engine for *Pivot.js*, which will greatly help with creating pivot reports in Rails applications.  Pivot.js has a decent [README](https://github.com/rjackson/pivot.js/blob/master/README.md), and more extensive [documentation](http://rjackson.github.com/pivot.js/docs/index.html#!/api/Pivot) is already underway with JsDuck.  Be sure to check out the [example](http://rjackson.github.com/pivot.js/) page and maybe give Pivot.js some love.  Thanks for reading ^_^.