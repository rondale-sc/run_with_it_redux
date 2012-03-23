---
layout: article
title: We're here to encapsulate
description: The concept is familiar to most programmers.  Put simply it is bringing data and the methods that operate on it together under a single namespace. This article will showcase a few ways to encapsulate data in javascript.  Specifically we will create a constructor class, and a module.
permalink: /encapsulation-in-javascript.html
---

# {{ page.title }}

The concept of encapsulation is familiar to most programmers.  Put simply it is bringing data and the methods that operate on it together under a single namespace (or object)<a href="#footnote_1">[1]</a>. This article will showcase a few ways to encapsulate data, which in Javascript is quite important as many scripts may be rendered on a single page with little or no knowledge of one another. We we will take a quick tour of the prototype/constructor pattern, then follow up with the popular (and my favorite) module pattern.

## Be a Builder

{% gist 2155999 gist-1.js %}

The above code creates an instance of Mammal for cat and dog.  Each instance is fully contained within itself.  You'll note that the prototype method is used to extend print() to Mammal without having to redefine it for each instance. Subsequently each Mammal has the prototype method print() defined.

Likely none of this is new to you, after all javascript has been around for well over a decade.  The important concept here is not the construction of an instance in javascript, its the encapsulation of your code.  With the **constructor pattern** (as basic as it is) you can very easily create a namespace for sets of data that belong with one another without having to duplicate code needlessly.  The object "Cat" has claws, and "Dog" has a wet nose, yet I define both by setting <span style="background:#2A2D33;font-size:0.8em;"class="pre"><span class="k">this</span><span style="color:#F8F8F8">.defining_characteristic</span></span> and each object's data is scoped to its own namespace.

## Modules are where it's at.

{% gist 2155999 gist-2.js %}

The **module pattern** is similar to constructor pattern in many ways.  It offers a way to create an instance of an object, and limits namespace exposure.  However, the **module pattern** brings another useful feature to the table.  That is, it offers the ability to deliniate between public and private functions/variables.  The functions and methods you define inside the enclosure (the parenthesis surrounding the anonymous function) are only available publicly if they are explicitly returned.

The internal state of each instance of Mammal can only be accessed on init.  You would need to create a getter/setter function to modify it after it has been initialized.  This is similar to the way Ruby handles object visiblity.  <s>The other way it differs from the constructor pattern is that the prototype class is not instantiated.  Which reduces the memory consumption of the object (among other things)</s>. Original <a href="#footnote_3">[3]edited</a>

>By using new to invoke the function, the object holds onto a worthless prototype object. That wastes memory with no offsetting advantage. -Douglas Crockford<a href="#footnote_2">[2]</a>

Personally I like the module pattern over the constructor pattern not just because of the reasons outlined in Douglas Crockford's post from 2006 when he formalized the technique<a href="#footnote_2">[2]</a>, but because it is so logical. I define my module and initialize its internal state, if I want to further modify the internal state I have to create and explicitly call a function for that purpose.  Forcing yourself to be explicit will reduce the number of silly bugs hard to find bugs that occur when you forget about your scope.

##Conclusions
Encapsulation is one of the main pillars upon which Object Orientated Programming is built.  Understanding how to do it, and what pattern is the best fit for your needs is critical to creating easy to maintain, solid programs.  I come from a Ruby background so even though these encapsulation concepts are familiar to me researching how to do these things in Javascript has been immensely helpful.  It has given me insight into Object Oriented Design patterns, and has helped me in other languages.

I hope you find this useful, don't forget to check the references below as many of these concepts have been fleshed out before. I'd especially like to note <span style="font-size:12px;">[Essential JavaScript Design Patterns For Beginners, 2011](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#creationalpatternjavascript)</span> as I believe it is one of the better articles on the subject and will expose you to more than just constructor/module patterns.  Have fun!

**Edit fix typo in module pattern snippet, credit bruno-c

**Edit in Crockford's article he referred to using "new" directly on a function definition, and in that case the prototype is useless, credit <a id="footnote_3" href="http://news.ycombinator.com/item?id=2992502">jugglinmike</a>
<br/>
#### References
<ul>
  <li><span  style="font-size:12px;">1.) <a id="footnote_1" href="http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming)">Wikipedia</a></span></li>
  <li><span  style="font-size:12px;">2.) <a id="footnote_2" href="http://yuiblog.com/blog/2006/11/13/javascript-we-hardly-new-ya/">YUI blog, 2006</a></span></li>
</ul>

####Additional References (Reading)
[]()
<ul>
  <li><span style="font-size:12px;">[Essential JavaScript Design Patterns For Beginners, 2011](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#creationalpatternjavascript)</span></li>
  <li><span style="font-size:12px;">[Adequately good, 2010](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)</span></li>
  <li><span style="font-size:12px;">[Encapsulation in Javascript, 2010](http://www.codeproject.com/KB/scripting/jsoops.aspx)</span></li>
</ul>