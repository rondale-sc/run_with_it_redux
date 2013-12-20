---
layout: article
title: Finding Failure - Git Bisect
description: Any sufficiently large development team will assuredly run into a situation where a failure occurs in a codebase that isn't exposed by the test suite.  When this happens it helps to have something to reach for, something to help you narrow down that sea of incoming code into a manageable chunk to be debugged.  We're in luck, let's learn about Git's Bisect command
permalink: /finding-failure-git-bisect.html
---

# {{ page.title }}

<small>Originally posted at [Hashrocket.com](http://hashrocket.com/blog/posts/finding-failure-git-bisect)</small>

Any sufficiently large development team will assuredly run into a situation where a failure occurs in a codebase that isn't exposed by the test suite.  Depending on the teams' commitment to test coverage this situation might be all too common.  When this happens it helps to have something to reach for, something to help you narrow down that sea of incoming code into a manageable chunk to be debugged.  With only a few team members this is something that you'd likely do without thinking.  

"Oh, it's broken?  Must have been that commit from yesterday." -Joe Developer

What happens when Joe's team is too large for him to review every commit?  Well, that's what I'd like to talk about.  There is a tool for that:

Git bisect!

Git bisect is a tool that performs a binary search (more on this later) across a range of commits to help you find where an error was introduced.  Unfortunately, its use is not as wide spread as it should be. Personally, I found it quite intimidating at first, though now I find myself utilizing it everytime an issue like this arises.

# Let's get started

If you're anything like me you want to get started with git bisect straight away.  With that in mind, we'll cover basic functionality first then move into what is actually happening later.  

The first command is `git bisect start`, which begins the bisect.  With the bisect begun, you'll now need to mark a bad commit.  You'll do that with:

`git bisect bad`

That will mark HEAD as a bad commit.  Alternatively, you could pass the `sha` of a specific commit like so:

`git bisect bad <sha>`

Then, unsurprisingly, you'll want to set a good commit.  This will be the last known good commit. These two commands will set the outer bounds of the binary search.  After the `git bisect good <sha>` command, git will split the revisions and load the first guess.

At this point you'll need to find a way to determine if that commit is broken or not.  Usually this can be accomplished by running a test or loading up your develpment environment.  When you know the state of the commit run `git bisect good` or `git bisect bad` to load the next revision.  Eventually git will tell you which commit the error was introduced.

Ta da!  Git bisect in a nutshell.  

# A little deeper

Git bisect is performs a binary search across your commits.  A binary search is also know as a half-interval search, and in my opinion, better describes what it does.  I'm going to run through an example to illustrate how bisect works, but if you'd like to get a better understanding of binary search look [here](http://en.wikipedia.org/wiki/Binary_search_algorithm).  

Let's assume that we have 5 commits.  They'll look something like:

![](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/commit_1_through_5_no_color.png)


We notice that we have a failure at commit five.  We start git bisect off with the commands above:

```
git bisect start
git bisect good <c1-sha>
git bisect bad
```

Git will do somethings under the hood (more on that later), and mark the commits like so:

![](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/commits_1_and_5_marked.png)

After that last command git will transition your current working branch to the next revision up for testing:

![](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/commit_revision_3.png)

We run our test to find that c3 is good and we tell git that it's good by running `git bisect good` again:


![](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/commits_3_and_5_marked.png)

And again git will take current working branch to the next revision up for testing:

![](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/revision_commit_4.png)

We run our spec and discover that c4 is the commit the error was introduced in.  

In this example, with five commits, we were able to find the commit that introduced the error without having to test each individual commit.  We were able to omit testing of commit two.  Over a larger range of commits this saving will be, obviously, greater. (1 + log2 N) [[3]](http://stackoverflow.com/questions/4713088/how-to-use-git-bisect/4714297#4714297)

# A little deeper, still

I run Hashrocket's [dotmatrix](https://github.com/hashrocket/dotmatrix) on my development machine.  It sets a prompt that has information relevant to git when in a git directory.  I noticed, during a debugging session, that the prompt was aware of when a bisect was happening.  Naturally, this sparked my curiosity so I delved a little deeper to find out what git was doing under the surface.

So what is git doing to facilitate the bisect?  Let's explore with an actual example of git bisect.

If you'd like to follow along you can pull down this [repo](https://github.com/rondale-sc/bisect-example).

Let's assume we've been developing a calculator program that adds two numbers together.  Everything is looking great, until we notice that our Rspec suite no longer passes.  In our haste to create the world's best calculator in Ruby we've pushed bad code up to master.  We know to use bisect in this scenario so we start it up.

We run `git bisect start` and to know what files git is creating we follow that with `tail -n +1 -- .git/BISECT_*` to see the following output:

![git-bisect-start-tail](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/git-bisect-start-tail.png)

We know that master is bad so let's mark it `git bisect bad` and again follow up with our tail command:


![git-bisect-bad-tail](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/git-bisect-bad-tail.png)

We can now see that git has logged the commit we've marked as bad.   We remember explicitly that rspec ran green on our initial commit so we let git know that by typing `git bisect good HEAD~4`

Git tells us the commit that we've jumped to for test, and how many more steps we have to go.  

![git-bisect-first-revsion](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/git-bisect-first-revision-tail.png)

We can see that git uses `.git/BISECT_EXPECTED_REV` to set which revision is currently under test.  Running our test suite verifies that this revision is good.  So we tell git `git bisect good`.  Git again tells which revision we're on, and how many we have left.  

Our test suite fails on this commit.  So we mark it as bad with `git bisect bad`

![git-bisect-success](http://hashrocket-production.s3.amazonaws.com/uploads/blog/misc/finding-failure-git-bisect-jj/git-bisect-success.png)

To which Git tells us that this was the commit that introduced the error and prints the log for that commit.


In this example we could have automated the whole thing with 

```
git bisect run rspec calculator.rb
```

Which would have run the test suite against each revision and marked good or bad based on the exit code of the command.  

# Conclusions

We've learned that Git's bisect command is a powerful way to diagnose problems as they arise in a code base.  Though it can appear intimidating at first the command is actually quite simple.  So next time you run into an error remember to reach for this, it may save you some time.  :)

TL;DR

1. `git bisect start`
2. `git bisect bad`
3. `git bisect good HEAD~4`
4. `git bisect run rspec <test_file>`

<small>References:</small>

1. [Linux Bisect Man Page](https://www.kernel.org/pub/software/scm/git/docs/git-bisect.html)
2. [Git Bisect - Thoughtbot Article](http://robots.thoughtbot.com/git-bisect)
3. [Good Stack Overflow Answer](http://stackoverflow.com/questions/4713088/how-to-use-git-bisect/4714297#4714297)
4. [Fighting regressions with git bisect](http://schacon.github.io/git/git-bisect-lk2009.html)
