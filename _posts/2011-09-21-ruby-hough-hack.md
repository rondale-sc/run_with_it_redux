---
layout: article
title: Ruby Hough Hack
description: The hough transform is an algorithm used to detect edges/objects in an image.  I recently needed to use it to straighten an image so that I could process it.  Here is the (imperfect) solution me and my brother hacked out today.
permalink: /ruby-hough-hack.html
---

# {{ page.title }}

{% include _twitter_share.html %}

The hough transform<a href="#footnote_1">[1]</a> is an algorithm used to detect lines <s>detect edges/objects</s> in an image. I recently needed to use it to straighten an image so that I could process it. Here is the solution me and my brother hacked out today using Chunky PNG

{% gist 2156226 gist-1.rb %}

Was fun to work on.  Hope someone finds a use for it.  Just remember that the important part here is how you define your restriction.  In my case I was looking for a straight black line.

The gist is <a href="https://gist.github.com/1233581">here</a>.

***edit zzgwon pointed out that the hough algorithm is used for line detection not object detection.

*** edit RIP_Kashin pointed out a few errors in the initialize function, namely a stray 'a'.  Unfortunately I can't render strike through so you'll have to trust me.

#### References

<ul>
  <li><span  style="font-size:12px;">1.) <a id="footnote_1" href="http://en.wikipedia.org/wiki/Hough_transform">Wikipedia</a></span></li>
</ul>

####Additional References
<ul>
  <li><span  style="font-size:12px;"><a id="footnote_1" href="http://www.codeproject.com/KB/graphics/Deskew_an_Image.aspx">Code Project; How to Deskew an image</a></span></li>
  <li><span  style="font-size:12px;"><a id="footnote_1" href="http://www.seas.upenn.edu/~bensapp/opencvdocs/ref/opencvref_cv.htm">Open CV</a></span></li>
</ul>