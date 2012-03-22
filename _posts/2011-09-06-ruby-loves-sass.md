---
layout: article
title: Ruby <3's Sass
permalink: /ruby-loves-sass.html
---

# {{ page.title }}

<span class="small">**TL;DR** -- <a href="#sass_implementation">Grid in SCSS</a></span>

I recently tweeted:

>Rails 3.1 will now parse erb before scss. Good idea to write a small gem to allow creation of css grids in ruby? <%= grid(rows, width) %>

## Ruby in Sass

So I decided to come up with something of my own with this quick gist. Most of this is directly from [Sass Docs](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html)

<script src="https://gist.github.com/2155905.js?file=gist-1.rb"></script>

As you can see sass, being its awesome self, allows us to quickly add ruby to the functions module and call it directly in your SCSS files. The only caveat is that it expects arguments to be passed in as Sass::Script::Literal objects. Still, having to unwrap and rewrap objects coming in and out of the function is a small price to pay for ruby in your stylesheets.

## Pure SASS > Ruby in stylesheets
After thinking I just solved something important.  [Chris Eppstein](https://twitter.com/#!/chriseppstein) responded to my gist with a much more sassy way to do the same thing in pure sass.  <a id="sass_implementation"></a>

<script src="https://gist.github.com/2155905.js?file=gist-2.sass"></script>

It's pretty obvious to see that adding a function in ruby to create a grid doesn't make much sense when you can write in pure scss that concisely.  However, I'm very excited to see what is possible with as easy as it was to implement custom functions.
