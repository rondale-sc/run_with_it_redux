---
layout: article
title: Setting Up a Remote Environment
description: Here I'll show you how easy it is to set up an alternate remote dev environment in Rails.  Allowing you to work from home.  ^_^
permalink: /setting-up-a-remote-environment.html
---

# {{ page.title }}

Let's create a development_remote environment to tunnel our traffic through an ssh tunnel so we can work with your development environment from home.

## Set up your SSH forward

I'll assume that you are running a MySQL server on 192.168.0.1:3306 and you have a box with an external IP that has local access to it.

{% gist 2156604  gist-1.sh %}


Forward 3307 192.168.100.1:3306

You'll want to copy your public key into the ~/.ssh/authorized_keys file to prevent those pesky password prompts.  With that done you simply ssh into the rails_blog_db box like so:

    $ ssh rails_blog_db
    # Leave this running...

Alright that part was easy let's move on to the Rails stuff.

## Create your environment file

{% gist 2156604  gist-2.rb %}

This will load your development configuration file when you load your development_remote environment.

## Edit your database YAML
Once you've done that you need to add another entry to your database.yml file.

{% gist 2156604  gist-3.yml %}

Some of the fancy YML syntax aside, it's pretty straightforward.  You are assigning the default attributes to development_remote, assigning the database attribute to the dev db, and assiging the host and port to your remote's forward.

## Update your application.rb

In order to render the pages the environment needs to know how to serve assets.  To do that you'll need to edit your application.rb file.

{% gist 2156604 gist-4.rb%}

Find the line for the bundler require and add development_remote to the assets array.  Once that's done you can simply run your server and everything will work as you expect:

    $ rails s -e development_remote

##Conclusions

Alright so now you are cruising and working from home.  Hopefully, this is a technique that will help you better interact with your code.  Don't think that you can only use this to tunnel to your dev setup, you can also use it to create a staging environment, run tests remotely, and a whole host of other things.  So by all means, go, be creative!