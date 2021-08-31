---
author: krona
---
I was going to write a post about how great [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) is because all I had to do to style my website was add two classes:
```
<div class"prose prose-red">
</div>
```

But after doing that little bit of work, I thought to myself:
"Oh, let's make a "loading..." bouncing text animation for my website since a lot of stuff is still work in progress"

Seems pretty simple right? Wrong.

It would have been wayyyyy more simpler had I been using some other framework, but since this is Jekyll, which uses Liquid, it was much harder than it should have been. There are two main factors for this:
1. Finding documentation for liquid is much harder than for regular languages. I had to resort to guides and answers written for Shopify users to find my answers. The official documentation is really bad.
2. I have no idea how to include javascript or css right into my main file. I know they had `script` and `style` tags in shopify, but those dont work in Jekyll

You can checkout [this commit](https://github.com/kronaemmanuel/kronaemmanuel.github.io/commit/1a4acbb48e656c0320912202f66272800a73b193) to checkout the liquid code which splits a word into letters, then applies a dynamic `animation-duration` and `animation-delay` to each letter.

and here's the final result:
{% include bouncing_text.html content="BlaBlaBla" %}

and if you aren't reading this post too much in the future, you might see a similar animation down below, don't worry, it will be removed soon enough.
