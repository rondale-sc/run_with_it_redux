---
layout: article
title: Make it your own
description: In my last article I spoke about Pry.  Here I'll walk you through how to customize your Pry session.
permalink: /make-it-your-own.html
---

# {{ page.title }}

{% include _twitter_share.html %}

So you've started using pry.  You've likely found this article from my previous article <a href="http://www.jonathan-jackson.net/give-it-a-pry">Give it a Pry</a>, and your digging Pry.  You've already found how quickly the Pry repl becomes second nature, how useful having easy shell access is, and how easily it slices to the heart of your code (I'm assuming).  If you're at that point you're probably looking around to see what else you can do.  I'll re-iterate a point made in "Give it a Pry", go to the WIKI! There is a ton of documentation that will not only help you understand Pry better, but also help you to shed light on your own code.  In this article I'm going to quickly show you how to use commands, which are yet another cool feature provided by Pry.

## Commands, a unique solution.

Pry lets you define commands which make the inclusion and execution of arbitrary bits of code trivial[[1]](https://github.com/pry/pry/wiki/Command-system#wiki-Invoking_commands).  The Pry command structure is unique in that the command methods are executed before normal Ruby code is executed. This is important for reasons you'll see below.

If you are anything like me then your ~/.irbrc file had many top level methods(like below), well with pry these can be transformed into commands.

{% gist 2156369 gist-1.rb %}

This method is limited because if, while in the IRB session, I define something like so I'll over-ride my top-level method.

    $-> irb

    >> def clear
    >>   puts "This is going to over-ride the irbrc #clear"
    >> end
    => nil

    >> clear
    => "This is going to over-ride the irbrc #clear"


If instead we implemented the #clear method as a Pry command we would not over-ride the existing functionality.  Oh, and it's easy.

{% gist 2156369 gist-2.rb %}

    $-> pry

    pry(main)> def clear
    pry(main)*   puts "If there is a space before the #clear call I will be fired!"
    pry(main)* end
    => nil

    pry(main)>clear # Will clear screen.
    pry(main)> clear
    => "If there is a space before the #clear call I will be fired!"

The first argument passed to command is the name of the command, the second is an optional description, the block passed in is what will be executed.  Simple.  Be creative.

## Conclusions

Commands let you very easily customize your pry session.  I have a few methods that I really enjoy having any time I'm in Pry that I'll share in the references.  Thanks for reading this quick run-down.

***edit You can modify the way you call commands by changing the Pry.config.command_prefix, which defaults to '' (tick tick).

#### References
<span  style="font-size:12px;">1.) [Command Wiki Entry](https://github.com/pry/pry/wiki/Command-system#wiki-Invoking_commands)</span>

####Additional References
<span style="font-size:12px;">[Configure Wiki](https://github.com/pry/pry/wiki/Customization-and-configuration#wiki-Config_commands)</span>
<span style="font-size:12px;">[Example ~/.pryrc](https://gist.github.com/1297510)</span>