---
layout: article
title: RVM and rbenv
permalink: /rvm-and-rbenv.html
---

# {{ page.title }}

Many of you are familiar with rbenv and some of the controversy surrounding it. I love RVM and will more than likely continue to use it, but one of the things I truly value in the ruby community is always having more than one option.  I was delightfully surprised with the simplicity of rbenv, how easy it was, and how familiar it felt right out of the box. This article will provide a (humorous) side-by-side comparison of the basic usage and installation of rbenv and RVM.

# Installation
<img src="http://www.jonathan-jackson.net/assets/rvm-rbenv-install.png" alt="rvm and rbenv side by side install"/>

In RVM you need to add this to your profile to load the RVM function.

    # or ~/.zshrc
    $ echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile


In rbenv you need to add this to your profile to load the rbenv command-line function.

    # or ~/.zshrc
    $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
    $ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile #to enable shims and auto-complete


Once you've restarted your shell you now have access to RVM/rbenv.  It is important to note that RVM and rbenv cannot be installed at the same time because of the way RVM handles the 'gem' command.

# Get Rubies
<img src="http://www.jonathan-jackson.net/assets/rvm-rbenv-rubies.png" alt="rvm and rbenv side by side ruby compile and install"/>

In RVM you install your rubies to **/Users/$USER/.rvm/rubies/ruby-1.9.2-x** in rbenv your rubies are installed to **~/.rbenv/versions**.  Sam Stephenson created a sister gem for rbenv called ruby-build which offers several convencience methods for installing/compiling your own rubies.

For instance, once you have ruby-build installed you can type this:

    $ rbenv install ruby-1.9.2-x


So now you have your rubies.  Best blog post EVAR! Wait, there's more...

# Gemsets
<img src="http://www.jonathan-jackson.net/assets/rvm-rbenv-gemsets.png" alt="rvm and rbenv side by side gemset usage"/>

Gemsets are my favorite thing about RVM and I was happy to see rbenv has that functionality easily available <a href="https://github.com/jamis/rbenv-gemset">[1]</a>.

# But wait, what about cd and gem?

RVM overrides cd and gem commands to enable some of its functionality.  "What about those commands?" you ask. To which I reply: if that is an issue then rbenv might be a better fit.  However, I doubt the majority of users will ever have a problem with the over-ride of these commands.

<img src="http://www.jonathan-jackson.net/assets/move-along-trollface.png" alt="rvm and rbenv should be used depending on need"/>


# Conclusions
You saw the strips above, they offer **a lot** of the same functionality.  In many ways rbenv and RVM are really just two sides of the same coin.  A different way to solve the same problem. I will say this article  is from a purely functional stance, I understand that under the hood rbenv and RVM are quite different.

There has been quite a bit of controversy surrounding the rbenv/rvm divide.  I think, after installing both back-to-back on my own system, that their similarities outweigh their differences.  One article I read about the subject compared RVM and rbenv to Rails and Sinatra <a href="http://www.rubyinside.com/rbenv-a-simple-new-ruby-version-management-tool-5302.html" alt="rbenv a simple ruby version management tool">[2]</a>.  I think that comparison really fits. Sinatra is a lightweight framework whereas Rails is much more robust. Sometimes sinatra just fits, and other times you'd be a fool to not go with Rails.  If you need the features in RVM then use it, if you want more control and a lighter feel then use rbenv.  It's all a matter of preference.

As a rubyist I'm just glad we have people like <a href="https://github.com/wayneeseguin" alt="wayne seguin's github">Wayne Seguin</a>, and <a href="https://github.com/sstephenson" alt="sam stephenson's github'">Sam Stephenson</a> contributing to the community the way they do.

#### References
<span  style="font-size:12px;">1.) <a id="footnote_1" href="https://github.com/jamis/rbenv-gemset">rbenv gemset</a></span><br/>
<span  style="font-size:12px;">2.) <a id="footnote_2" href="http://www.rubyinside.com/rbenv-a-simple-new-ruby-version-management-tool-5302.html">Ruby Inside - rbenv article</a></span><br/>

####Additional References (Reading)

<span style="font-size:12px;">[Begin Rescue End (RVM home page)](http://beginrescueend.com/)</span><br/>
<span style="font-size:12px;">[rbenv on github](https://github.com/sstephenson/rbenv)</span><br/>
<span style="font-size:12px;">[Rage-Builder](http://ragecomics.memebase.com/rage-builder/)</span><br/>