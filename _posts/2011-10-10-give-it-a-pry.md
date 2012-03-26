---
layout: article
title: Give it a Pry
description: Pry is an amazing tool for code exploration, and a great addition to your utility belt.  Here I'll highlight a few of the reasons why I think Pry is worth your time.
permalink: /give-it-a-pry.html
---

# {{ page.title }}

{% include _twitter_share.html %}

If you are familiar with the Ruby programming language you've almost assuredly had some experience with IRB. Pry expands upon the functionality of IRB.  It offers some interesting features that allow you to really dive in and explore your code.  I've been using it for a little while now and already it has proven to be one of my favorite tools. Here are a few of my favorite things about Pry.  Sprinkled throughout will be links to the wiki, where the Pry folks have put together some really solid documentation behind all this.

<img style="margin:auto;" src='http://www.jonathan-jackson.net/assets/pry_image.png'/>

Here are the top five reasons why I switched to pry.

### 1.) Easy shell access

Using the shell from inside an pry session is simple, convenient, and practical.  You simply prepend the command you would like to run in your shell with a period [[1]](https://github.com/pry/pry/wiki/Shell-Integration).

{% gist 2156313 gist-1.sh %}

This becomes a really convenient way to launch Vi or Textmate, run Git commands, interact with ImageMagick, et al.  What's more is you can also shunt ruby output directly into your command with  '#{}' like this.

{% gist 2156313 gist-2.sh %}

### 2.) Object transparency

With Pry you get some real syntactic sugar for interacting with your objects.  You can use the 'cd' command to change self to whatever you pass to it as args [[2]](https://github.com/pry/pry/wiki/State-navigation).  Once you get into the object you can use 'ls' to snoop around.  If you've spent some time in the linux shell you'll be surprised at how quickly you begin to feel at home with these commands.

Don't forget you can further filter what you are searching for with 'ls' by passing a regex to the --grep flag.

{% gist 2156313 gist-3.sh %}

### 3.) View Source

Once you've got your mind wrapped around contexts and found out how easy it is to navigate your code you're ready to really pop the hood on your code.  Pry offers a way to look at your source code directly via #show-method [[3]](https://github.com/pry/pry/wiki/Source-browsing). If you install pry-doc with Pry you'll find that the show-method allows you to view Ruby's C source code also.  (Great tool for comparing Rubinius/MRI for example)

{% gist 2156313 gist-4.sh %}

### 4.) Editor Integration

Now here is my favorite feature.  I've been using interactive_editor for a long time, which is a gem by [jberkel](https://github.com/jberkel) inspired by Giles Bowkett.  It offered a nice little convenience for opening a tempfile in your favorite editor, allowed you to edit it, and executed it when you closed the editor pane.  Pry offers similar functionality [[4]](https://github.com/pry/pry/wiki/Editor-integration).

{% gist 2156313 gist-5.sh %}

The difference between this and interactive_editor(ie) is that ie will save the buffer so that the next time you invoke the command it will return you to your previous state.  Interactive Editor is compatible with Pry and can simply be required in your ~/.pryrc file to load it into your pry session if you want that particular functionality (Highly recommend).

That's not all!

edit-method will open the file that contains the method passed to it as its args, and place your cursor exactly where it is defined.

{% gist 2156313 gist-6.sh %}

### 5.) Gists!!!

Push your current buffer directly to a gist.

{% gist 2156313 gist-7.sh %}

That just happened!

## Conclusions

Believe me when I tell you that I haven't even begun to scratch the surface of Pry with this blog post.  The features outlined above are just a few methods that most naturally became part of my workflow.  [John Mair](https://github.com/banister) and the contributors to Pry have put together extensive documentation for the Pry repl and I recommend you take a look.  [Ryan Bates](https://github.com/ryanb) has done a railscasts that shows how you can easily incorporate pry into your Rails apps, and [Josh Cheek](https://github.com/joshcheek) put together an awesome cast that gives you a crash course in Pry.  Links to both casts and wiki can be found below.

I hope that the brief examples above have sparked your curiosity about Pry.  I have used it now for a little while and it has proven to be an indispensable tool. Thanks for reading.

***edit If you got this far you may want to check out ['Make it your own'](http://www.jonathan-jackson.net/make-it-your-own).  My follow up post which expands upon this post by giving a brief overview of Pry commands.


***edit John Mair is searching for a sponsor for Pry.  Contact him at his Github page [here](https://github.com/banister) if you know someone who might be interested.  Any funds would be used to improve the website and create new casts/documentation.

<span style="font-size:12px;">(An unofficial item six would be the documentation. Everywhere I looked I found great resources for exploring Pry.)</span>

#### References
<span  style="font-size:12px;">1.) [Shell Access](https://github.com/pry/pry/wiki/Shell-Integration)</span><br/>
<span  style="font-size:12px;">2.) [Object Transparency](https://github.com/pry/pry/wiki/State-navigation)</span><br/>
<span  style="font-size:12px;">3.) [View Source](https://github.com/pry/pry/wiki/Source-browsing)</span><br/>
<span  style="font-size:12px;">4.) [Editor Integration](https://github.com/pry/pry/wiki/Editor-integration)</span><br/>

####Additional References
<span style="font-size:12px;">[Pry RailsCast, 2011](http://railscasts.com/episodes/280-pry-with-rails)</span><br/>
<span style="font-size:12px;">[Josh Cheek Introduction to Pry, 2011](http://vimeo.com/26391171)</span><br/>
<span style="font-size:12px;">[Hacker News Pry comments, 2011](http://news.ycombinator.com/item?id=2478724)</span><br/>
<span style="font-size:12px;">[Interactive Editor](https://github.com/jberkel/interactive_editor)</span><br/>