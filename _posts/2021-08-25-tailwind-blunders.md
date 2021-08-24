---
author: krona
---
So I'm trying to setup my tailwindcss to work properly and I'm constantly getting this error:
```
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/styles.scss':
  Error: unterminated attribute selector for type on line 632:16 of styles.scss >> .prose ol[type="A" s] { ---------------^
```

And I wasn't sure why I was getting this error. But then I compared my code to the repo of the guide I was following to do this by [Katie Kodes](https://katiekodes.com/jekyll-tailwind). I realized that the Katie was importing the tailwind styles into a `main.css` file while I was doing it in `main.scss`. So I changed my extension from `.scss` to `.css`

Also, I found this [Stack Overflow issue](https://stackoverflow.com/questions/68898511/tailwindcss-typography-sasscsyntaxerror-error-unterminated-attribute-select/68898512#68898512) which was the same as mine. The guy who wrote the question answered his own question and reasoned that "this new syntax for CSS rules is not supported by libsass / sassc." so hence the error.

Well, I tried to understand what this meant and found this:
1. I thought that the issue was with the `[type="A" s]` part, maybe that was something new in the CSS Spec (I haven't seen this syntax before). And maybe this wasn't handled by Scss yet. However, the CSS attribute selector of the type: `.prose ol[type="A" s]` have been around since 2018. These [specs](https://www.w3.org/TR/selectors-4/) were last updated in 2018. So I guess it's not that issue.
2. I also created a [Codepen](https://codepen.io/StoryMode/pen/XWgJmrj) to see if Scss created this error in a setup other than Jekyll. I set SCSS as my CSS preprocessor in it. However, it didn't cause any errors, and worked.
3. The Stack Overflow guy had mentioned "libsass" and "sassc". I found that LibSass was [deprecated](https://sass-lang.com/blog/libsass-is-deprecated) from the Sass's blog. Also found that they now use Dart Sass, which was surprising to me, I didn't know that Sass was using Dart. Go Dart!
4. Another thing that made me curious is that the error is about the selector being unterminated. I switched the preprocessor in my Codepen from [Scss to Sass](https://codepen.io/StoryMode/pen/OJgPyyd), and it gave me an error, that it was expecting a end of line. Ofcourse it did, Sass does away with the squiggly braces, so ofcourse it gave me that error. Which makes me think, does jekyll use Sass or does it use Scss? 🤔 In the error message I see that the error is created by `Jekyll::Converters:Scss` which I guess means that its an Scss compiler, but then why would it not parse valid CSS code. Anywho, that's as far as I'm gonna pursue this. Its late, I should be asleep by now.
