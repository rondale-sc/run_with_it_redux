---
layout: article
title: Omniauth and Other Drugs
description: Hello everyone, I'm back.  Here to share a neat piece of code with you.  It isn't very practical but it illustrates how easy it is to use Omniauth
permalink: /omniauth-and-other-drugs.html
---

# {{ page.title }}

First of all I'd like to apologize for my extended absence these last few months.  I have been extremely busy revamping three old rails apps, one of which was using rails ~1.2.


Anyways, that's not what I want to talk about today.  Today is all about Omniauth.  I originally chalked Omniauth up as yet another flavor of the week authentication mechanism.  Boy was I wrong.  Omniauth is an authentication framework that allows you to incorporate standardized 'Strategies' quickly in your applications.  It's a Rack middleware so including it into Rails/Sinatra/whatever is incredibly easy and even fun.  Here I'm going to show you a trick that our team used to create a default provider login in a rails application using Omniauth's #on_failed_registration hook.


Surprise Code!

{% gist 2156513 gist-1.rb %}

Weird combiniation of authorization mechanisms I know, but it will be illustrative. This is what a typical omniauth initializer looks like.  You specify which providers you want to be available and the necessary information required by the strategy.  Most of the strategies available have good documentation, with the possible exception of LDAP ( though it has enough to start ). Once we realized we wanted to have a single custom form (the default forms are kinda bland) that didn't require the specifying of a provider we started tinkering.

{% gist 2156513 gist-2.rb %}

As you can see it's actually quite trivial to have it call another authentication strategy. You have to set the environment, and in this case the username to be authenticated.  Once that's done simply call calback_call which performs the steps necessary to run the callback phase of a strategy.

Now that you understand what is going on let me explain our use case.  We have an application that is accessible to clients via the web (for reporting and the like), but is also an important part of our employee's daily workflow.  We wanted to use this to allow the same form to be used for both people logging in from Identity (clients) and from LDAP (employees).

This accomplished that but felt hackish, so we ended up creating our own oauth strategy/provider.  Still I really like how easy Omniauth made this.  Hope this was interesting.

#### References
<span  style="font-size:12px;">1.) [Omniauth](https://github.com/intridea/omniauth)</span>

#### Additional References
<span style="font-size:12px;">[Railscasts Omniauth](http://railscasts.com/episodes/235-omniauth-part-1)</span>