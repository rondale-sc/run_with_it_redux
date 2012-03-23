---
layout: article
title: Playin' with the Ruby GC
permalink: /playin-with-the-ruby-gc.html
---

# {{ page.title }}

So I, like many of you geeks out there heard about the changes to Ruby in 1.9.3-rc1.  Upon hearing the news, I hurriedly scanned the intra-webz to see if there were any cool features that would affect me or my production apps.  Some of the changes in the release candidate were pleasantly surprising, especially file loading (which saw a notable ~38% speed boost).  When I saw the garbage collector was being changed to something called "Lazy Sweeping" I had to figure out how much this was going to impact performance.  I mean c'mon "lazy sweeping", sounds so interesting right?  So I started writing a script to tell me just that.

Let's start this in reverse order.

##The results

I found that the the new "lazy sweeping" (still super cool name) was about *8%* faster on average.  Here's the pretty graph I created from Excel.

<img src="http://www.jonathan-jackson.net/assets/gc_graph.png" alt="gc graph" style="width:600px"/>

The vertical axis is the time in milliseconds, and the horizontal axis represents the GC cycle during the creation of ~10,000 objects.  Alright alright alright.  I'll explain the methodology so you can actually understand the graph.

##The Methodology

While doing the research I came across a nifty little script by the Narihiro Nakamura <a href="http://redmine.ruby-lang.org/attachments/959/bm_gc_fragmentation.rb">here</a>.  I modified it slightly, but kept the same idea of creating a number of objects to fill up the heap.

{% gist 2156260 gist-1.rb %}

This returns a result set from the GC profiler.  Which I call about a hundred times like so:

{% gist 2156260 gist-2.rb %}

I attempted to run this ten thousand times but it just took too long.  I wanted to get a large sample because the GC can run at off times and isn't at all guaranteed to be consistent. I ended up just going with a 100 run set for sake of speed.  Once I had the script all set I just used RVM to set my ruby and ran it.  As of writing this article RVM didn't offer 1.9.3-rc1 so I used 1.9.3-preview1 instead.

##The interpretation

Well as I said before "lazy sweeping" is about 8% faster on average.  The largest increases in speed was when there were a small/medium number of objects in memory, the larger the number of objects the more 1.9.2 won out over 1.9.3. <a href="http://www.infoq.com/">InfoQ</a> talked to Narihiro Nakamura <a href="#footnote_2">[2]</a> where he explains why these results are likely accurate.

>If the program creates many long-lived objects, lazy sweep may not be able to find a free object. In that case, lazy sweep spends a long time on a single object allocation. I think that in most cases, the performance of this should still be better than M&S GC.

This InfoQ article was especially enlightening so I recommend giving it a glance through (it's in the footnote).

## Try it yourself

The GC module offers many ways to examine the garbage collector. If you want something more, then you should look into ruby-prof which has options that show you GC_TIME, GC_RUNS and a whole host of other useful profiling tools.  @wycats recently pushed a branch to ruby-prof that enables those GC operations, you can find it <a href="https://github.com/wycats/ruby-prof">here</a>.  You'll note that it requires ruby to be patched.  So try ruby-prof out!

Anyways, I know this wasn't exactly scientific but it was certainly fun and helped me understand some things about ruby a little better. Hope it helps you too.

Have an improvement to the scripts above?  Think I'm doing something completely wrong? Maybe you have an entirely different approach.  Let me know in the comments below, and don't forget to subscribe to 'Run With It'.

#### References
<ul>
<li><span  style="font-size:12px;">1.) <a id="footnote_1" href="http://www.redmine.org/">RedMine Script</a></span></li>
<li><span  style="font-size:12px;">2.) <a id="footnote_2" href="http://www.infoq.com/news/2011/08/ruby193-gc;jsessionid=AD723DB6898A9A0A368C5A1D9A5D2DAA">InfoQ Interview with Narihiro Nakamura, 2011</a></span></li>
</ul>

####Additional References (Reading)
[]()
<ul>
  <li><span style="font-size:12px;">[Joe Damato, 2010](http://blog.envylabs.com/2010/07/garbage-collection-the-ruby-heap/)</span></li>
  <li><span style="font-size:12px;">[Ruby Prof](http://ruby-prof.rubyforge.org/)</span></li>
</ul>