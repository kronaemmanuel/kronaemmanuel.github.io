---
title: Creating a new website using Hugo
---

I need a website where I can easily write blogposts of the fun projects I do. I want to host it on Github Pages on the subdomain [lab.kronaemmanuel.com](http://www.lab.kronaemmanuel.com). The idea being that the page is a collection of all the "experiments" I do. I want to have a website which has the following features:
1. Showcases the various fun little projects that I work on
2. Shows a mini essay that I write while I create the project as a form of documentation of how the project was built.

Hence, on the development side of things, I want a platform where it is super easy to write content, which I can then post. I thought that I could do so with my Jekyll personal website, but it doesn't look like Jekyll can easilly connect to some pre built headless CMS such as Netlify CMS or Contentful. So I'm looking at other options. Even though I love javascript, and its my forte, I want to use other languages, So I'm going to try Hugo.

Hugo is a static site generator made in Go Language, which I've always wanted to use anyways so this is a nice excuse for me to learn a bit of Go Language as I make my website.

Hugo's documentation is definitely not that good. While Jekyll gives me a running website even without a theme, it seems that I wouldn't be able to do so in Hugo. Hugo also doesn't have documentation on how to setup a website if you're not installing a prebuilt theme where Jekyll has awesome documentation on what to do if you're starting from scratch. Therefore, as I figure it out, I want to write this blogpost to document how to get started with Hugo without a theme.

Right away, I can see that running `hugo server -D` gives me a couple of warnings that:
```
WARN 2021/09/07 01:21:41 found no layout file for "HTML" for kind "page": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
WARN 2021/09/07 01:21:41 found no layout file for "HTML" for kind "home": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
WARN 2021/09/07 01:21:41 found no layout file for "HTML" for kind "taxonomy": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
WARN 2021/09/07 01:21:41 found no layout file for "HTML" for kind "section": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
WARN 2021/09/07 01:21:41 found no layout file for "HTML" for kind "taxonomy": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
```
Seems like I need at layouts files for at least "page", "home", "taxonomy", and "section". Well, let's see if these are really required, or if I can skip some of them.

## Create a layout file
So I guessed that it needed a basic layout file, so I created one called `layouts/index.html` and put some random html in it, and now my website actually has content showing on its home page. But ofcourse, that's not what i want. I want a layout page which allows me to put content inside it. So let's just setup some basic html for now, and then we can look at how to put content inside the layout.

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sample Title</title>
  </head>
  <body>
    <h1>Hello, welcome to a working Hugo website</h1>
  </body>
</html>
```
## Put content inside a layout file
I remember that while glossing over the docs, there was mention of a [Go templating language](https://pkg.go.dev/text/template). Although the docs on the Go website were boring, the documentation on Hugo's website about [templating](https://gohugo.io/templates/introduction/) was quite useful. So already I understand that we can use [front matter](https://gohugo.io/content-management/front-matter/) (metadata about some content file) fields to specify a title for the page instead of using hardcoded text in the layout file. So let's make some modifications:
{% raw %}
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ .Title }}</title>
  </head>
  <body>
    <h1>{{ .Content }}</h1>
  </body>
</html>

```
{% endraw %}
Since the front matter can contain the values for `Title` and `Content` so we have put these here to be fetched from the content itself.

Now for our content file, I can create `content/_index.md` which will be the content file for our home page.
```
---
title: Home
layout: index
---
Hello There

```
I can now rejoice a bit as our home page is finally working, and I can put stuff in it.
## Using Hugo Pipes for Assets
We need a way to style our document and for that we need to include CSS. All style files are considered an asset, so to use those within our project, we will use [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/). Let's see how they work. First I can create a new folder `/assets` and a file within that to contain my css: `/assets/main.css`. Let's put some simple css in it for now:
```
body {
  color: red;
}
```
I set the font color to red just so it would be immediately visible if my Hugo Pipe was working correctly. I can put the pipe in my `/layout/index.html` like this in my `<head>` tag:
{% raw %}
```
    <!-- Default Stylesheet -->
    {{ $style := resources.Get "main.css" }}
    <link rel="stylesheet" href="{{ $style.Permalink }}">
```
{% endraw %}
And its working, I did have to restart my server though, as it didn't recognize the new file in the `/assets` folder otherwise. Now my text is red, So i know that the css is working correctly.
## Partial Templates
We need a navigation bar for our website, and we probably want it on most pages, so we can make a partial template of it which we can include in the `layout/index.html` which is probably our default layout. A partial template is not a full page, but rather just a part of it.

I create a new partial template at `layout/partials/navbar.html`. `/layout/partials/` is a special folder just for partial templates. Here is some simple code which we put in our navbar:
```
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
```
Now to include this partial in our `layout/index.html` template, we can use the partial function from Hugo templating langugage:
{% raw %}
```
    <!-- Navigation Bar -->
    {{ partial "navbar.html" . }}
```
{% endraw %}

We can now see a navigation bar in our homepage. Although the About page doesn't work, we can fix that.
## Adding more pages
To add more pages, I [looked around a bit](https://gohugo.io/templates/base/), and found that I needed a default template, so I created a `/layout/_default/page.html` template, gave it all the same content as my `layout/index.html`. I guess the `layout/index.html` is just for the `index.md` content page, and the the one in the `layout/_default` directory is for everything else. Anyways, I also added an About page in my content folder as `/content/about.md`. I put some sample content in it and set the `layout` template as `page` in my front matter:
```
---
title: Home
layout: page
---
# About me
Blim Blam
```
## Add a navigation bar
In Jekyll, I was using a `navigation_routes.yaml` data file which had all the routes defined in it, and I could use that to create a navigation bar. I guess you can do that in Hugo too, I tried but couldn't figure our how to give a different class to the active page. But i did find another solution, which is to use Hugo's own Menu system. Here's how one can do that. We need to add our pages to the the menu. Let's say we call out menu `main`. So we will have to add this entry to our front matter of the pages which we want to include in the menu.
```
---
title: About
layout: page
menu: "main"
---
```
Here I have added it to `content/about.md` page, I'll also do the same for my `content/_index.md` page. After that I will consider that these two pages have now been added to an array over which I can iterate. To iterate through that array I can use the following logic in my `layout/partials/navbar.html` file.
{% raw %}
```
<nav>
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <a class="normal{{if $currentPage.IsMenuCurrent "main" . }} active{{end}}" href="{{ .URL }}" title="{{ .Title }}">{{ .Name }}</a>
    {{ end }}
</nav>
```
{% endraw %}
What's happening here is that `.` is the current context, when the code starts parsing, the current context is the Page since we have passed it this context when we called the navbar partial by putting a `.` at the end of the partial function call. So we assign this value to a variable called `$currentPage` and then we loop over the main menu of the site and then check if the `$currentPage` is also the currently selected page in the menu. I do not understand the difference between `IsMenuCurrent` and `HasMenuCurrent` which is another method I could have used. However this works perfectly for our usecase, it gives us the `active` class when the page is currently selected in the navbar. So let's set some different styling for our `active` class in our `/assets/main.css`:
```
.active {
  color: green;
}
```
So anyways, that's all good in the hood. We have managed to create a working Hugo website without the need for any theme. Although it doesn't look too good, I believe its in working condition.

My plan with this website is to style it with Tailwind CSS. I also want to experiment with Notion API, maybe I can write all my content there, and then this website can just use that content instead. Let's see. I'll add more blogposts regarding this if I can.
