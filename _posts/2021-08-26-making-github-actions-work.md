---
author: krona
---
After finishing my tailwind blogpost yesterday, I realized that it didn't actually publish and that my github action setup to deploy the websitewasn't working. I had followed the [guide](https://jekyllrb.com/docs/continuous-integration/github-actions/) on Jekyll's own website to make the github action, but it wasn't working.

I quickly realized that the action I had created didn't support npm or Node. So I had to set that up myself, after trying it and failing too many times, I finally hit a vein of gold. I found this [issue](https://githubmemory.com/repo/mhanberg/jekyll-postcss/issues/20) by a lovely person named DavidUnzue. He was facing the exact same issue that I was facing, so I'm not describe the issue in detail here. Anyways, someone else and him had figured out how to solve it. And I followed his advice of using a [different](https://github.com/limjh16/jekyll-action-ts) github action and also running `npm install` before it. And voila! My [github action](https://github.com/kronaemmanuel/kronaemmanuel.github.io/actions/runs/1168075987) started working! You can check out the github action history before the linked action to see all the times I failed. 15 times to be exact.

Anyways, I realized that I had much to learn about github actions, and even more to learn about docker.
