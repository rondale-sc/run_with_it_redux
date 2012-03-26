---
layout: article
description: I've migrated Run With It to jekyll.  The migration introduces a bunch of changes that will let me write more while still keeping the code clean.
title: New Site, New Style
---

# {{ page.title }}

{% include _twitter_share.html %}

<small>TL:DR Migrated from Rails to Jekyll and here is why:</small>

I know everyone hates getting on their RSS in the morning, seeing a new post from an author who you are (hopefully) excited about, and it being a trivial post about changes to the site.  But in this case I think you'll find that it's worth it.  I've migrated this blog to jekyll!  Here's why I switched.

I think you know by now how much I care for Rails.  It was my first experience with the ruby language and still allows for extremely speedy development.  With that said, I don't think it fits for this blog.  I originally wanted to create my own commenting system, allow for rich user interaction, and integrate with other forms of social media.  I believe I hit some of those markers right out of the gate, but quickly realized I wasn't using the additional features.  Here are a few of the reasons why:

1.  Users don't and shouldn't implicitly trust your website.
 * Use Disqus for comments.

2.  Don't roll your own authentication (or any authentication) if you don't need it.
 * Bad form to require your users to provide information about themselves to use basic functionality (like comments)

3. You must reduce friction between yourself creating the content and that content being available.
 * Web-UI's can be polished and awesome, but as a person who spends most of my time in robust text editors I'm a little spoiled.  Let me write where I feel comfortable and then git push to deploy.

Enter Jekyll.  Jekyll is a static site generator that basically just pre-processes your site so that they can be served statically through nginx/apache.  It helps solve all of the problems above.  Allowing you to include disqus comments and other social widgets easily.  It's configurable; you can write in textile, html, markdown, or plain text.  Also you can extend Jekyll with plugins written in _Ruby_!

I've also felt that I wasn't able to spend enough time on the Rails codebase for Run With It.  This basically turned my repo into a junk drawer, with inline styles, little testing, etc...

With Jekyll I front-loaded all the dev time.  I used Twitter bootstrap to help keep my layout clean, and use github Gists to embed my code.

Along the way I learned a lot about Jekyll.  I'll leave a few of the links that really helped  me below in the references section.  I hope you all like the new look.  Please let me know what you think!  ^_^

<span style="font-size:10px">PS: The RSS feed is slightly different than before so your reader might mark them all as unread.  I'm sorry for any inconvenience</span>

####Additional References
<span style="font-size:12px;">[Jekyll Wiki, Great Info Here](https://github.com/mojombo/jekyll/wiki)</span><br/>
<span style="font-size:12px;">[BinaryMuse's gist liquid tag extension, for rendering gists and raw code in noscript tags for RSS](https://gist.github.com/2158360)</span><br/>
<span style="font-size:12px;">[Rewrite urls without .html extension in Nginx](http://www.ph-lee.com/2011/07/05/nginx-rewrite-rules-for-html-extensions.html)</span><br/>
<span style="font-size:12px;">[Tom Preston Werner's Jekyll site for basic idea of jekyll tree](https://github.com/mojombo/mojombo.github.com)</span><br/>