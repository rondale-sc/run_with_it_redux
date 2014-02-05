---
layout: article_lite
title: Understanding Instruction Sequence Disasm
description: With the upcoming bookclub on Ruby Under a Microscope I decided to dive into some C internals to better understand what was going on.
permalink: /understanding-instruction-sequence-disasm.html
---

# {{ page.title }}

I've been trying to go through some of the MRI internals in order to better follow along with Pat Shaunessy's examples from Ruby Under a Microscope.  Pat shows us how to analayze the output from `RubyVM::InstructionSequence#disasm`, and it's great.  When we compile simple programs we can see the instructions that YARV is going to execute.  Let's look at an example:

![output](http://i.imgur.com/WP9UciH.png)

Each stack frame is shown in a pretty understandable way.  Here is a good [article](http://www.rehanjaffer.com/how-to-disassemble-ruby-code-into-rubyvm-yarv-opcodes-instruction-sequences/) that gives us an quick list of all the instruction set definitions.  These definitions can be found in `insns.def` in the source.  I found this quite illuminating.

Anyways, while going through all this I really wanted to know what this was:

![](http://i.imgur.com/Y7xmEeJ.png)

So I went into the code and found [this](https://gist.github.com/8817174).  My `C` is a little rusty but I eventually found my way to:
{% gist 8817409 rb_iseq_disasm.c %}

Which then led to:
{% gist 8817409 rb_iseq_disasm_insn.c %}

Here we see Ruby is using a macro `rb_str_catf` which calls [printf](http://rxr.whitequark.org/mri/source/include/ruby/intern.h#661) and prints the `pos` variable.  This `pos` variable is the position of the current instruction being printed.

This has been kind of a dump of information, hopefully it is helpful.  Let me know if you like this style of post, it's considerably less formal as I am really just walking you through some problem I'm working on.

Thanks for reading!
