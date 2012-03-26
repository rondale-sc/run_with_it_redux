---
layout: article
title: Life in a shade of ruby
description: Conway's Game of Life is a mainstay in Hacker culture.  Here I'll go in depth about it's rules and my implementation.
permalink: /life-in-a-shade-of-ruby.html
---

# {{ page.title }}

{% include _twitter_share.html %}

Conway's Game of Life is a great way to practice your craft.  I recently created my own rendition in Ruby, and have plans to implement it in Javascript and Erlang.  If you haven't heard of Conway's Game of life (CGOL), it is a cellular automaton [[1]](http://en.wikipedia.org/wiki/Cellular_automaton), essentially a mathematical model, consisting of a two dimensional grid where each x and y coordinate are either alive or dead.  Whether a cell is alive or dead is governed by a simple set of rules, and the game advances/evolves by applying the rules to each cell based on the previous generation's configuration and then repeating.  Wow, that was seriously a mouthful.  I would go into why this game has kept programmers interested in it despite being ~forty years old, but as soon as you start with CGOL you'll see how fascinating it is to see an entire world of complexity arise from low level constructs. Let's go through the rules and then meet back up to discuss the code.

#Rules

Each cell has eight neighbors, three above, one on either side, and three below.  The rules of CGOL simply govern the state of the cell in question as it relates to the state of its neighbor cells.

<img src="http://www.jonathan-jackson.net/assets/game_of_life_rules.png" alt="game_of_life_rules"/>

That's it.  For real.  The entire list of rules can be summarized in Ruby like so.

{% gist 2156522 gist-1.rb %}

After seeing that, you get an idea of why this CGOL is so interesting.  Its set of rules create extreme complexity from little input. Take a look at the pattern, acorn. It is a methuselah that takes 5206 generations to generate 633 cells including 13 escaped gliders [[2]](http://en.wikipedia.org/wiki/Methuselah_(cellular_automaton)).  (It won't mature fully in the video because it's on a 50x50 grid)

<iframe src="http://player.vimeo.com/video/37406843" width="488" height="274" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

#The Code

Now that you understand Conway's Game of Life, we can start talking about how to implement it.  The examples found here are from my first attempt at creating CGOL.  It's not perfect, but it'll serve to illustrate why this is such a fun problem.  [Ryan Bigg](https://github.com/radar) did a screencast in which he creates CGOL through a test driven approach [[3]](http://www.rubyinside.com/screencast-coding-conways-game-of-life-in-ruby-the-tdd-way-with-rspec-5564.html).  It's well worth your time and probably a better implementation.  For now, we'll just go off my version.

#The Cell

{% gist 2156522 gist-2.rb %}

This is your basic cell.  It stores its own coordinates and whether it is alive or not.  The Cell#is_alive? sets a variable called future_alive which dictates its state in the next generation.  The reason we need to store its future state in its own variable is because if we change its alive status (while iterating over each celll) it will alter its neighbors calculations.  Each new generation must be computed using the previous generation's information.  To avoid violating this principle, we need to store the calculated value while operating on the original state.

It might be better not to save the coordinates within the cell itself, but it makes working with the object much, much easier.  Basically, with the Cell class we have a mini state machine.

After that, creating the grid of cells is as easy as:

{% gist 2156522 gist-3.rb %}

#The Game

To tie all the cells together, I created the Game class.  It creates the playing board and processes each generation.  We initialize it with the dimensions of the board and how many generations we'd like to process, and tell it to #play.

{% gist 2156522 gist-4.rb %}

The cool part is Game#alive_neighbors it's here where we determine how many neighbors are alive.  I've said before that when you have Ennumerable#inject everything looks like a nail.  It's definitely my favorite ennumerable method, and here I use it to get a count of neighboring cells with their internal state set to alive.  We just take the point we are testing and add the points from the @neighbors array and add to sum if that cell is alive.  Super simple.

<img src="http://www.jonathan-jackson.net/assets/alive_neighbors.png" width="630" alt="skitch outline of #alive_neighbors"/>

# The Pattern

Alright, that's all well and good, but we don't actually have any cells alive in the initial state so our entire program (though perfectly functional) does exactly nothing.  So I created a pattern Class:

{% gist 2156522 gist-5.rb %}

You'll notice that the Pattern#set_cells method looks a lot like the alive_neighbors method and it is.  This allows you to trigger certain cells alive by calculating their points relative to an origin point.  It sounds complicated, but it's actually quite simple, assuming you have a pattern you just call:

{% gist 2156522 gist-6.rb %}

Call that directly before you begin iterating over @steps in Game#Play and you'll create your origin points.  Once you've gotten familiar with that, you can create any pattern you like (there are many great patterns online).  Here is the famous gospers-glider-gun:

<iframe src="http://player.vimeo.com/video/37540376" width="488" height="274" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

Defined like so:

{% gist 2156522 gist-7.rb %}

#Conclusions

In Ruby, I completed my first working prototype CGOL in an hour or two.  It was a lot of fun. It's a great problem and has probably been written in every language ever created. The reasons for that are clear; it's a fun problem that forces you to use many different aspects of the language.  In Ruby, this was pretty simple, but I've been writing in Ruby for years.  I'm going to try writing this in a language I don't know well and use it for what it is: a fun learning tool.  Some of the patterns I've seen around the web have truly impressed me.  While rules of the game are simple, the resulting complexity is truly amazing.  Take some time and try coding this in your language of choice, or improve this one.  Either way, have fun with it.  ^_^

#### References
<span  style="font-size:12px;">1.) [Wiki Entry on Cellular Automaton](http://en.wikipedia.org/wiki/Cellular_automaton)</span><br/>
<span  style="font-size:12px;">2.) <a href="http://en.wikipedia.org/wiki/Methuselah_(cellular_automaton)">Methuselah Definition</a></span><br/>
<span  style="font-size:12px;">3.) [Ryan Bigg's Solution TDD](http://www.rubyinside.com/screencast-coding-conways-game-of-life-in-ruby-the-tdd-way-with-rspec-5564.html)</span><br/>


####Additional References
<span style="font-size:12px;">[Awesome Life News Site](http://pentadecathlon.com/lifeNews/)</span><br/>
<span style="font-size:12px;">[Game of Life Demo on YouTube](http://www.youtube.com/watch?v=XcuBvj0pw-E)</span><br/>
