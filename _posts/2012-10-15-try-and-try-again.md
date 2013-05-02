---
layout: article
description: I'll breifly go through a simple implementation of the NullOjbect pattern.  Also some refactoring. :)
title: "Try and Try Again"
---

# {{ page.title }}

{% include _twitter_share.html %}

Attending MagicRuby this year provided me with many take-aways that I would like to discuss.  One of these is that of the NullObject Pattern (NOP).  There were a number of great presentations there, and I know this topic probably old hat for some of the longer-bearded fellows, but I really like the idea.

I saw a brief glimpse into the NullObject pattern during Ben Orenstein's talk about refactoring [1].  Essentially, the Null Object pattern allows you to create a neutral object that takes the place of Nil.  In fancy terms, the NOP lets the client to ignore the difference between a null operation and a real operation via an abstraction layer.

I know your first question will invariablly be: Why?

## The Why

Why would you use the Null Object pattern?  Let's go into a simple example.

{% gist 3896565 gist-1.rb %}

So this is pretty straightforward.  We want to be able to display the assigned supervisors' name, and if the supervisor hasn't been set yet, we'd like to display the message "No supervisor assigned."  And this code does that pretty well.  However, as we build this class out this gets pretty messy.  We'll continually have to check for the existence of `supervisor`.  The NullObject pattern helps us to remove this smell.

## The How

Alright, so hopefully you are all on board with at least contemplating using the NullObject pattern, but what's next?  The first thing we need to do is refactor our class a bit.  Supervisor will likely have other methods defined and therefore merits its own class.  So let's do that now:

{% gist 3896565 gist-2.rb %}

That looks a little better; the supervisor class is now isolated and we have more of a clue as to what the supervisor object is responsible for.  However, we still have the same issue.  We are asking the object if it's nil in order to display the right #display_name.  This is where we'll actually create a NullObject and make it respond to the methods we expect supervisor to know.

{% gist 3896565 gist-3.rb %}

So now our class, incorporated with the NullObject, looks like this:

{% gist 3896565 gist-4.rb %}

## What did we just do?

We placed an abstraction layer between Project and 'Supervisor'.  Depending on how you initialize Project supervisor will be a class of either Supervisor or NullSupervisor.  This difference is transparent to the Client, in this case class Project, and allows you to be more declarative in your code.

** Side note **

The use of Struct.new to reveal the intent of the supervisor array is taken from both Ben, who mentioned something similar in his talk, and from Sandi Metz' book ***Practical Object Oriented Design*** [2]

## The Downside

The downside that was immediately brought to bear during the Q&A section was that the creation of the NullObject introduces coupling between NullObject and Object (In this case NullSupervisor & Supervisor).

A quick definition of coupling is "the degree to which each program module relies on each one of the other modules."[3]  In this case, any time you add a method to Supervisor you must create a mirror of it on NullSupervisor.

Personally, I think if you want to have custom fuctions for a NullObject represenation of a particular data structure, you should actually put some thought into it, so this coupling doesn't bother me too much.  It's pretty easy to understand and allows you to write code with authority.  However, sometimes this just isn't the right fit, and if it's not, go with something else.

## Conclusion

The NullObject pattern can be used in many more cases than this, and in many different ways. Learning about this pattern has helped me to think through the instances where I would normally have just used a conditional.  Thinking about how your code works, and what callers will send to your object, will help you write more understandable code.

Thanks for reading.

***edit:***
<small>Edited the gists to pass supervisor in as an object, rather than an Array. Also, set default in initialize params rather than by ternary. [Link](http://www.reddit.com/r/ruby/comments/11kgim/try_and_try_again_a_quick_article_on_the_null/c6nd83d) to comment which pointed this out.  Thanks safiire.</small>

#### References
<span  style="font-size:12px;">1.) [Ben Orenstein's talk from Scottish Ruby](http://programme.scottishrubyconference.com/proposals/78/video)</span><br/>
<span  style="font-size:12px;">2.) [Practical Object-Oriented Design in Ruby - Sandi Metz](http://www.amazon.com/dp/0321721330)</span><br/>
<span  style="font-size:12px;">3.) [Wiki Entry on Null Object Pattern](http://en.wikipedia.org/wiki/Null_Object_pattern)</span><br/>


<small>I hadn't read all of the additional references section until after I'd finished work on this article.  Some really great stuff here.  Take special note of Avdi's article, as it covers this topic in more depth.</small>

####Additional References
<span style="font-size:12px;">[Null Objects and Falsiness - Avdi Grimm ](http://devblog.avdi.org/2011/05/30/null-objects-and-falsiness/)</span><br/>
<span style="font-size:12px;">[Old school article with very useful graph describing NOP (Java - yuck)](http://www.oodesign.com/null-object-pattern.html)</span><br/>
<span style="font-size:12px;">[Design Patterns in the Wild: Null Object - Josh Clayton](http://robots.thoughtbot.com/post/12179019201/design-patterns-in-the-wild-null-object)</span><br/>


