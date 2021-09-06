---
title: Trying various CMS(s) with my Jekyll website
---

Alright, so tbh, I kinda hate Jekyll, it just seems too old. I guess Eleventy, Hugo, Gatsby are way better for generating static websites. But anyways, I came to Jekyll because I wanted to experience something other than javascript.

In my last post, I discovered that I couldn't easily put images etc. into my blogpost and hence was unable to explain or show some things that I would have wanted to. So to solve that issue, I tried three things.
## Contentful
[Contentful](https://www.contentful.com/) is a service which allows you to manage a headless CMS which your static site generator (such as Jekyll) can use to pull in data. I found the following useful links about how I could use Contentful with my website, however, I eventually gave up on trying to use it.
1. [Katie Kodes' article](https://katiekodes.com/jekyll-api-headless-cms/)
2. [Contentful's jekyll plugin](https://github.com/contentful/jekyll-contentful-data-import)

## Netlify CMS
The great Netlify had way better docs and guidance than Contentful, but I didn't wanna switch over my blog to netlify because I was already using it for some other websites and wanted to get more accustomed to Github Pages and Github Actions. Here are some useful links tho:
1. [Netlify CMS Jekyll Docs](https://www.netlifycms.org/docs/jekyll/)
2. [Netfliy CMS General Add to Site Docs](https://www.netlifycms.org/docs/add-to-your-site)

## Jekyll Admin
After trying my luck with both CMSs above, I remembered that I had come across Jekyll Admin [repo](https://github.com/jekyll/jekyll-admin/) when I was browsing the Jekyll organization on github once. So I decided to give it a go. It seems pretty simple to use and also fulfills all my requirements. Although there is one requirement that I want to still test. Does it allow me to put in images without any effort? Let's test it rn.

And no, we can't add it easilly. So I guess this whole thing was a failure. Follow me for more disappointing experiences like this 🥲
