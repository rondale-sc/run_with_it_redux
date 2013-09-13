---
layout: article_lite
title: Phantom Js CLI options
description: Quick tip about customizing phantom js through poltergeist.
permalink: /cli-phantomjs-options-through-poltergeist.html
---

<h1 class="title">{{ page.title }}
{% include _twitter_share.html %}
</h1>

Recently ran into an issue where my cucumber suite was throwing a timeout error.  The error was thrown because an image hosted externally wasn't rendering.  Luckily Phantomjs has some amazing [Command Line Options](https://github.com/ariya/phantomjs/wiki/API-Reference) available to help us along.  On of which is `--load-images` which allows us to prevent phantom from making the image request.

Let's setup poltergeist (Phantomjs' capybara driver) to accept these options...

{% gist 6553515 cli_options.rb %}

As you can see we can specify a list of the CLI options and they'll be set when we run our suite.  And there you have it, prevent phantomjs from requesting images!

Thanks for reading!

