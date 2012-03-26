---
layout: article
title: Man and Ruby
description: If you've had any experience with Unix operating systems you undoubtedly know the value of a good man page.  Here I'll show you how to incorporate man pages into your work flow and maybe even author your own.
permalink: /man-and-ruby.html
---

# {{ page.title }}

{% include _twitter_share.html %}

If you've found this blog it's likely that you are at least somewhat familiar with Unix and Unix-like operating systems.  If so you undoubtedly know about Man pages.  For those of you who don't; the man page is the unix system for documenting command-line applications.  They are succinct and clear guides to how you can interact with an application.  If you are on a *nix system you can pop open your terminal right now and type `man man` and see what I'm talking about.  As developers, we often baulk at documenting our code.  We enjoy creating new things, not tediously writing about our last project.  Here I'll give a brief overview of how you can incorporate man pages into your workflow, then show you how easy it can be to create this basic documentation. Trust me, you'll make a lot of friends if you do it, and probably find that its not as tedious as you think.

## WorkFlow

Using man is easy as typing '`man < command_name >`'.  If you want to view a specific secition of a man page you can type '`man < section_number > < command_name >`'. The beauty of man pages and Unix is that it really is that simple.

[Michael Edgar](http://carboni.ca/blog) submitted a patch [[1]](http://rubyforge.org/tracker/index.php?func=detail&aid=27691&group_id=126&atid=577) to rubygems to allow for explicit inclusion of man pages in the gemspec or implicit inclusion in the /man directory.  Unfortunately this patch has not been included despite being projected for inclusion in 1.4.  All is not lost, @defunkt, of GitHub fame and huge proponent of man page usage, wrote a nice little plugin called gem-man [[2]](https://github.com/defunkt/gem-man).

Gem-man checks to see if any man pages exist and displays it accordingly.  If multiple man sections are found it will provide you with an option to select one. It can be installed like so.

    gem install gem-man
    gem man gem-man


If you pass gem-man the `-s` argument it will fall back to searching system files for your man page.  With that in mind you can create an easy alias which will let you use `man` to search both your systems man pages and any man pages found in your gems:

{% gist 2156493 gist-1.sh %}

## Authoring Your Own

Man pages must be written in an unfortunate format called roff [[3]](http://en.wikipedia.org/wiki/Roff). Roff is a format originally created in the 1970's with a limited set of formatting options.  Fortunately there is an alternative to writing in roff.  You can write in ronn!

<img src="http://www.jonathan-jackson.net/images/Ron.jpg" width="200px"/>

## Ronn
Ronn is a little command-line application for constructing valid roff from [markdown](http://daringfireball.net/projects/markdown/) by [Ryan Tomayko](https://github.com/rtomayko).  Ronn can also generate the familiar html renditions of your man page from markdown [[4]](https://github.com/rtomayko/ronn).  Markdown is easy to learn so I won't go into that for now, instead we'll talk about the content of a man page.

Man pages are broken into sections.  Let's build a general man page [[5]](http://rtomayko.github.com/ronn/ronn-format.7), which incidentally would be the first section.

1. The first thing we need to do is create a title, which should be the the name of your application then the number one in parenthesis to indicate that this is section one of your man page.

2. Next is to create a synopsis of the application by putting code tags around comands, then doing the same for any flags.  Should look something like this once its compiled to roff:
<img src="/images/man_synopsis.png" width="630px"/>
3. After that is a description.  Briefly describe what your application does.  This should be concise and strike at the heart of what you are trying to accomplish.  Don't be flowery, just get to the point.

4. Then onto options where you'll list your flags and give a one line description of what each does.

5. Once you've done the above steps you can write whatever you like.  Keep it on point, things like examples, basic usage, and any otherwise pertinent information that a user will need to use your app.

6. Finally, write your bug & author sections where you tell people where to file issues and who is responsible for the amazing application.

That's it.  Now all is left is to compile to roff and add to your project.


    $ ronn path/to/your/amazing/man.1.ronn
      -> roff: path/to/your/amazing/man.1
      -> html: path/to/your/amazing/man.1.html


## Conclusions

You've just created a man-page to the absolute delight of programmers world-wide.  Alright so maybe that's a little grandiose, but man-pages are an amazing asset to any program.  If you craft a well made application a man page should be the first step you take to increase its accessibility.  Also as we've learned it's easy!  Creating a man page is so easy that it's really a matter of why not.  I've found from writing a few for my own projects that it has helped me flesh out some behavior as well.  Though I believe that could be the act of documenting and not specific to man pages.  Either way man pages.  Do it.

Thanks for reading!

#### References
<span  style="font-size:12px;">1.) [Michael  Edgar's Rubygems Patch](http://rubyforge.org/tracker/index.php?func=detail&aid=27691&group_id=126&atid=577)</span><br/>
<span  style="font-size:12px;">2.) [gem-man GitHub page](https://github.com/defunkt/gem-man)</span><br/>
<span  style="font-size:12px;">3.) [Wikipedia: Roff](http://en.wikipedia.org/wiki/Roff)</span><br/>
<span  style="font-size:12px;">4.) [Ronn Github page](https://github.com/rtomayko/ronn)</span><br/>
<span  style="font-size:12px;">5.) [Ronn-Format man 7](http://rtomayko.github.com/ronn/ronn-format.7)</span><br/>

#### Additional References
<span style="font-size:12px;">[Chris Wanstrath on Man](http://ozmm.org/posts/man_what.html)</span><br/>
<span style="font-size:12px;">[Jens Schweikhardt's Man Page tutorial](http://tldp.org/HOWTO/Man-Page/)</span><br/>