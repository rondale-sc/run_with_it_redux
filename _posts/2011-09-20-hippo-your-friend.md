---
layout: article
title: 'Hippo: your friend in 5010'
description: HIPAA 5010 can be quite overwhelming at first.  The complexity the X12 people have fit into a simple flat file consisting a string separated by tildes is very impressive.  However, now you have hippo. A DSL to create and read transactions sets  in pure ruby!
permalink: /hippo-your-friend-for-5010.html
---

# {{ page.title }}

{% include _twitter_share.html %}

<img src="http://www.jonathan-jackson.net/assets/hippo.png" alt="hippo" class="span3" style="float:left;"/>If you are unfamiliar with the Health Insurance Portability and Accountability Act (HIPAA) then you probably don't work in the medical field and can safely disregard this article.  HIPAA was enacted by congress in 1996 and governs the way electronic transmissions must take place in order to be legitimate. <a href="footnote_1">[1]</a> The specific section that pertains to electronic transmissions is HIPAA/EDI, and was scheduled to take effect on October 16, 2003.  However, due to implementation problems Congress granted a one-year extension to make version 4010 the standard in 2004.  The standard by which transaction sets are accepted by HIPAA was created by the X12 organization  <a href="footnote_2">[2]</a> (i.e. Claims, Remittances, Eligibility, Claim Status).

This article will walk you through installation of Hippo, the generation of a simple 835 transaction set, and hopefully illustrate how easy Hippo makes HIPAA

##5010 is around the corner

HIPAA version 4010 is the current implementation of the transmission standard. The testing phase for 5010 has been underway since January 1, 2011 <a href="footnote_3">[3]</a>. This means that all covered entities have had to allow the sending of test transaction sets in the 5010 standard **already**.

Version 5010 was created to allow ICD-10-CM <a href="footnote_4">[4]</a> to be implemented, as well as other modifications that increase the effectiveness of the standard. The effective date for the 5010 implementation is January 1, 2012!

Enter **Hippo**, your gateway into HIPAA 5010 compliance!  Hippo was created by <a href="https://github.com/promedical" alt="promedicalinc github page">Pro Medical, Inc</a>, the company I work for, and we decided to open source the project in order to rise all ships so to speak.

If you were to open up an X12 transaction set as a text file it would look like a large string with fields separated by tildes, colons, and asterisks. This is very confusing stuff, and that confusion is compounded by the fact that in these flat files there are sets of data that are represented hierarchically.  Hippo makes the process of turning these awkward strings into understandable transaction sets easy by offering structure and the power of Ruby.

##Installation

Hippo is available as a gem so simply type the following command once you have ruby:

    # gem install hippo

Once you have it installed all you have to do is require it like so to begin.

    require 'rubygems'
    require 'hippo'

##Your first Transaction Set with Hippo

Remember, a transaction set is that long string with fields separated by tildes, asterisks, colons, et al.  The structure of most Transaction Sets have been created as Ruby classes in Hippo. For example, the 835 class (Remittance) is in 'hippo/lib/transaction_sets/HIPAA_835.rb'.  If you take a look in that file you will notice that it auto loads the 835 base class as well as all the loops that are permissible within X12's 835 format. This fact is important because the structure was parsed directly from the X12 published table date (the official X12 implementation guide/CSV).

The classes per transaction set have all of the segments (fields) that are permissible by X12 standards. They provide the structure by which we will store, and print our data.

The following code illustrates how you would create an instance of an 835 transaction set and populate its ST(Transaction Set Header) segment in Hippo.

{% gist 2156191 gist-1.rb %}

##To loop, or not to loop?


One of the fundamental constructs found in the X12 transaction set standard is the loop. Loops repeat within a section of the final output, sometimes an arbitrary number of times. Creating this structure with Hippo is easy. Simply call the loop by name like so:

{% gist 2156191 gist-2.rb %}

Here the loop is created by simply calling the L1000A loop directly on the transaction set. In the code above are two forms that are functionally equivalent and can be used according to preference. Each form will create a loop at that position within the transaction set.

These examples are definitely not valid transaction sets, they are designed to give you a feel for how the DSL operates.  If you would like to see how to generate a legitimate transaction set <a href="https://github.com/rjackson" alt="robert jackson's github page">Robert Jackson</a>, the author of Hippo, has provided an example <a href="https://github.com/promedical/hippo/blob/master/test/test_hipaa_835.rb">here</a>.

##Summary

The Hippo DSL allows you to use Ruby to quickly bring your company into compliance with HIPAA 5010.  The X12 organization has crammed a phenomenal amount of data into these transaction sets.  This data can be overwhelming at first, but with the structure provided by Hippo you can interact with it like a pro.  I hope you look into Hippo as the solution for your transition to the Hippo 5010 standard.

Hippo is open sourced under the Modified BSD license, and is readily available for forking on Github here <a href="https://github.com/promedical/hippo" alt="hippo github page">Hippo</a>


#### References
<ul>
<li><span  style="font-size:12px;">1.) <a id="footnote_1" href="http://www.cms.gov/HIPAAGenInfo/02_TheHIPAALawandRelated%20Information.asp#TopOfPage" alt="Centers for Medicare & Medicaid Services">Centers for Medicare & Medicaid Services</a></span></li>
<li><span  style="font-size:12px;">2.) <a id="footnote_2" href="http://www.x12.org/consolidatedguides/" alt="X12 organization">X12 guides</a></span></li>
<li><span  style="font-size:12px;">3.) <a id="footnote_3" href="https://www.cms.gov/icd10/" alt="ICD 10 information">CMS ICD 10</a></span></li>
<li><span  style="font-size:12px;">4.) <a id="footnote_4" href="https://www.cms.gov/ElectronicBillingEDITrans/18_5010D0.asp" alt="5010 Timeline">CMS 5010 Timeline</a></span></li>
</ul>

####Additional References (Reading)
<ui>
<li><span style="font-size:12px;">[Wikipedia HIPAA](http://en.wikipedia.org/wiki/HIPAA), 2011</span></li>
<li><span style="font-size:12px;">[Health and Human Services](http://www.hhs.gov/ocr/privacy/hipaa/understanding/index.html)</span></li>
<li><span style="font-size:12px;">Hippo image by [archigraphs](http://www.archigraphs.com/)</span></li>
</ul>