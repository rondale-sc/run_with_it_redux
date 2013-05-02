---
layout: article
title: SSL Nightmares 
description: Here we'll talk about what SSL is, some of the perils while using it, and how to set up mutual authentication with Ruby's net-http library. 
permalink: ssl-nightmares.html
---

# {{ page.title }}

{% include _twitter_share.html %}

On a recent project our development team ran into a brick wall around mutual auth with SSL.  The problem is a solved one, but Ruby's OpenSSL documentation leaves something to be desired (I'd love to pair on this, btw). I think had we had a better understanding of SSL under our belts we could have solved this without quite so much pain. Luckily, there is a tremendous amount of information out there concerning SSL.  Here I want to review what SSL is, and then quickly go through the process of setting up mutual auth with Ruby.

## What is SSL

Unfortunately, this topic is pretty heavy when it comes to vocabulary.  For the bulk of this article I'll refer to the ruby process as the **client** and the service you are trying to interact with the **server**.  Hopefully, it won't be too confusing, but if you have questions feel free to ping me on twitter (@rondale_sc) or leave a comment.

SSL is an acronym for Secure Sockets Layer, and is a way to facilitate the exchange of information securely via the exchange of keys.  A typical handshake process looks something like the following:

![ssl-negotiation](/images/ssl_negotiation.png)

This process is something that virtually every Ruby HTTP library supports, we'll be using `net-http` from the standard library for the code samples in this article. The above interaction can be done in just a few lines of Ruby like so:

<small>Many of the following examples are from a repo made by [augustl](https://github.com/augustl) named [net_http_cheatsheet](https://github.com/augustl/net-http-cheat-sheet).  This repo is an excellent resource that will be further sited at the bottom of this post.</small>

{% gist 5504735 standard_ssl.rb %}

Fairly straightforward stuff here.  The entire SSL process is taken care of for you.  An important note here is the `verify_mode` attr we set.  This setting is used to determine how the server's ssl certificate is authenticated against the client's certificate authority (I'll explain more in a second).  

Many older blog posts and tutorials on the subject encourage you to set this to `VERIFY_NONE`.  

**NEVER EVER EVER** do this!  

If you don't belive me read [this](http://jamesgolick.com/2011/2/15/verify-none..html) by James Gollick.

When you set your `verify_mode` to `VERIFY_NONE` you are bypassing the part where the client verifies the server's SSL certificate against the client's certificate authority.  A certificate authority is the third party entity that verifies that the SSL certificate's public key is owned by the by the issuer in the SSL certificate's subject.

The process outlined in the diagram above is just the one facet of SSL.  The other purpose of SSL is to encrypt the information while it travels.   There is a great video explanation of this process that I highly reccomend [here](http://www.youtube.com/watch?v=iQsKdtjwtYI).  Now that we have a decent idea of what it takes to start an ssl connection, let's look into how it handles its other side: encryption.

The server's SSL certificate comes with a public key, an issuer, and a bunch of other information.  When you receive this information the client can look up this public key and ensure that it was issued by who it says it was issued from.  Once that verification has been accomplished the client encrypts the information with the public key and sends it to the server.  The server can now use its private key to decrypt the information.  

Mutual Authentication is doing the handshake process (slightly different, but similar) from both perspectives, the client and the server.  This process ensures both identities. Let's send the client certificate to the server.  


{% gist 5504735 mutual_auth.rb %}

Seems complicated, but it isn't too hard.  The server will receive the client's key and certificate, this allows the server to run the verification against the certificate authority.  This process is to ensure that only authorized people can access the service.  Mutual auth is most often encountered when dealing with financial or health information where it is extremely important to secure services.  This practice is quite often used with a self-signed certificate.  

A certificate is considered self signed when the subject of the certificate and the issuer of the certificate are the same.  When this is the case a certificate authority must be generated that knows about this "self signed cert".  Then in order to authenticate you have to present a certificate which can be verified against this generated certificate authority (by both server and client).

Alright, that about wraps up the whirl wind tour of SSL and how to setup mutual auth.  I hope if you ever find yourself banging your head against a wall this post will help.  Thanks for reading! 

#### Resources

* [net-http-cheatsheet](https://github.com/augustl/net-http-cheat-sheet)
* [How to cure net http](http://www.rubyinside.com/how-to-cure-nethttps-risky-default-https-behavior-4010.html)
* [SSL](http://en.wikipedia.org/wiki/SSL)
* [Mutual Authentication](http://en.wikipedia.org/wiki/Mutual_authentication)
* [Certificate Authority](http://en.wikipedia.org/wiki/Certificate_authority)
* [Video Rundown of how SSL works](http://www.youtube.com/watch?v=iQsKdtjwtYI)</small>
