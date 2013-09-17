---
layout: article_lite
title: Transient Attributes with Fabrication
description: Here I'll show you a brief example of how to use transient attributes with the Fabrication gem!
permalink: /transient-attributes-with-fabrication.html
---

<h1 class="title">{{ page.title }}
{% include _twitter_share.html %}
</h1>

While writing a cucumber feature last week I found myself needing to assert on the count of a given associated model. The feature looked a bit like this (domain has been changed for clarity):
{% gist 6588523 transient_feature.feature %}

Unfortunately, we do not have the ability to tell the fabricator how many authors we'll need directly on the model, so the above feature won't work.

To get it to work we can head on into the fabricator file for `Article`.  We'll use `transient_attributes` to hold our `authors_count` temporarily, then we'll use an before create to ensure the proper number of authors.
{% gist 6588551 transient_fabrciator.rb %}


And there we go.

## A few small notes

* The step `Given the following articles with authors` is a *Fabrication* step.
* To generate these run `rails generate fabrication:cucumber_steps` which creates several step definitions for interacting with fabricators.

Thanks for reading.  So sorry I've brought another blog example into this world.  Forgive me.

:)


