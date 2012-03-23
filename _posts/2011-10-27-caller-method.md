---
layout: article
title: Caller Method
description: It's Friday and this week has been fraught with complicated bugs.  Here I share a method I found useful while trying to hack through these issues.
permalink: /caller-method.html
---

# {{ page.title }}

Hey everyone, It's Friday so I thought I might share with you a little snippet I found useful this past week.  I was debugging a particularly insidious bug, and wanted to see where the method I suspected of causing the bug was called.  Naturally, I thought of using the #caller method, which I did.  However, using the caller method seemed a bit unwieldy as its return value is a little difficult to read.  So I looked around to see if anyone had found a way to make the caller method a little more usable.  I found a post from Michael Grosser [[1]](http://grosser.it/2009/07/01/getting-the-caller-method-in-ruby/) which presented a neat solution.

I started using Pry [[2]](http://www.jonathan-jackson.net/give-it-a-pry) a while ago and decided I should convert Michael Grosser's script into a Pry command.  Which when used in combination with 'binding.pry' would help me better digest the caller method.

{% gist 2156399 gist-1.rb %}

## Using the Caller Method

The caller method is defined within Kernel and returns the current execution stack.  You can specify an optional start parameter which will suppress _n_ number of stack entries to omit.  With the above command in your ~/.pryrc file you can call caller_method and pass in the stack depth and it will return you the file, line, and method of that stack level.  Pretty neat.

As it turns out this didn't particularly help me to fix the bug, but nevertheless I found the method useful and hopefully you will too. I have a few ideas about making it accept a range so that I can specify the depth and see the level (like the above method) as well as its context.

Thanks for reading.  ^_^

#### References
<span  style="font-size:12px;">1.) [Michael Grosser's Class for using Caller Method, 2009](http://grosser.it/2009/07/01/getting-the-caller-method-in-ruby/)</span><br/>
<span  style="font-size:12px;">2.) [Give it a Pry, 2011](http://www.jonathan-jackson.net/give-it-a-pry)</span><br/>

####Additional References
<span style="font-size:12px;">[Ruby Core Docs Kernel#caller](http://www.ruby-doc.org/core-1.9.2/Kernel.html#method-i-caller)</span><br/>
<span style="font-size:12px;">[Ruby issue about possibly creating a new backtrace for caller](http://redmine.ruby-lang.org/issues/1906)</span><br/>
