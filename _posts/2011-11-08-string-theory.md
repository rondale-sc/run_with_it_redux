---
layout: article
title: String Theory
description: I like many of you have often idly wondered about the inner workings of Ruby.  This time I wanted to see if I was correct.  Here I'll show whether single quoted strings or double quoted strings are faster in 1.9.
permalink: /string-theory.html
---

# {{ page.title }}

{% include _twitter_share.html %}

The other day I found myself in an argument about whether or not a single quoted string was faster than a double quoted string. I know that there are conventions that dictate the use of one over the other for clarity, but I was curious to see if there was actually a performance component.  I being on the side of the single quoted string(SQ) thought surely since SQ strings aren't interpolated they'd be loads faster.  Unfortunately, proving myself right was not as easy as I had initially thought.

## Define the parameters

The first thing I needed to do to prove my point was to define how we would measure and quantify success of one string over the other.  We came up with these criteria:

1. The positive difference must be statistically significant.
2. The test must be consistent.
3. The sample size must be ample enough to account for any external factors.

## The results

<img src="http://www.jonathan-jackson.net/assets/ruby_1.9.3.png" width="630"/>

Right out of the shoots you can see that there is actually very little difference.  I found that single quoted strings were about ~0.19% faster than double quoted strings. This is hardly the victory I was hoping for.  The difference was more pronounced in jruby, but the test was significantly more erratic.

Anyways, I won right?  Wrong! Let's move onto the methodology and dig into why it might still be too early to bust out the ticker tape.

## Methodology

{% gist 2156488 gist-1.rb %}

In the above code I'm requiring './stats.rb' which is just a down and dirty stats class that I created [[1]](https://gist.github.com/1346872). All it does is let me calculate standard deviation and export the results to a csv file.  So here I ran each test string a thousand times calculating and storing the result(seconds) for each.  The test string simply instantiates a hundred thousand _a_'s and returns the time it took.  Sure enough we get that ~0.19% increase.  Nothing too fancy here.

Not so fast.

Remember that we specified criteria for this argument.  The test is mostly consistent so we satisfy rule 2.  Rule 3 also as 1000 results is probably an ample enough size.  However not so lucky when we run into rule 1.  The standard deviation for the single quoted string was larger than the SQ string speed increase(at ~.003s). This discrepancy means, at least to me, that the difference in speed between a sinqle quoted string and double quoted string is not statistically significant.

If I had more time I would increase the result set and attempt to account for outliers, but I think that this is probably a fairly typical outcome.

## Conclusions

At first I thought that this entire endeavor was a waste.  But, I think this was actually quite good for me.  It made me think scientifically and outside the box.  Also, the pestering question about whether it's better to use a single quoted string vs a double quoted string can once again be relegated to a semantic/style argument and not a practical one.  Anyways I had fun writing this one for sure, hope you found it useful.

If you like this sort of thing you should subscribe to this blog, thanks for reading.

#### References
<span  style="font-size:12px;">1.) [Down and Dirty Stats](https://gist.github.com/1346872)</span>

#### Additional References
<span style="font-size:12px;">[XKCD 171](http://xkcd.com/171/)</span>