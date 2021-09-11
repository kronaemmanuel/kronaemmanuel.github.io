---
title: "Implementing SHA-256 in Go language (with strings\U0001F972)"
---

I have put off doing anything in Go for a very long time. I had went through the Go tour a long time ago, but I hadn't actually made anything in it. I mean, I did make a [website](http://lab.kronaemmanuel.com/)(not complete yet ofc) in Hugo, which is a web framework made with Go, but it didn't feel like writing actual Go code. So to scratch this itch, i decided to finally write some Go code.

And I chose to implement SHA-256 algorithm with it. Since I joined the [Hack Club](http://hackclub.com/) community, I have been very motivated to do such small little experiments, just for fun. It always feels good to finish a small challenge that you've set for yourself.

I used this [Qvault: How SHA-256 works guide](https://qvault.io/cryptography/how-sha-2-works-step-by-step-sha-256/) for the algorithm, but there were some other ver useful links that I used, which are listed below:
  - [Go Docs: Getting Started](https://golang.org/doc/tutorial/getting-started)
  - [Go Docs: Create a Module](https://golang.org/doc/tutorial/create-module)
  - [Willf: String right/left pad library](https://github.com/willf/pad/blob/master/pad.go)
  - [GeeksForGeeks: How to rotate a string](https://www.geeksforgeeks.org/left-rotation-right-rotation-string-2/)
  - [GeeksForGeeks: How to XOR two binary strings](https://www.geeksforgeeks.org/xor-of-two-binary-strings/)
  - [GeeksForGeeks: How to reverse a string in Go](https://www.geeksforgeeks.org/how-to-reverse-a-string-in-golang/)
  - [Stack Overflow: Convert a binary string to hexadecimal string](https://stackoverflow.com/questions/25592084/converting-binary-string-to-a-hexadecimal-string-java)

## Challenges I faced:
- Obviously, the biggest challenge was that i was unfamiliar with the language, so doing anything meant doing some searching to find the right syntax to do something in Go language. But still, I was surprised that I was able to implement it with not that much difficulty. I think it goes to show that Go language has been well designed to be pretty intuitive. And also that the patterns you pick up from one language often carry over to other languages as well, so once you have worked with a couple of languages, it becomes easier to pick up new ones.
- Code grew too big in a single file

## Lessons learnt:
- The Go compiler is really good, although sometimes it was annoying that it would let me keep anything in the code that I wasn't using. I initially felt that this was slowing me down, since I wanted to iterate fast and move from trying one thing to another quickly. But soon, I got into the habit of commenting anything I wasn't using. And ultimately, it resulted in much cleaner code. I've been very guilty of leaving unused imports in javascript code because javascript doesn't error out if i do that.
- Go's editor support is really good. I started by coding on VSCode which had a really good extension. But I soon switched over to neovim, which is my primary code editor. I was able to get really good support through the `coc-go` extension. I will look into more advanced vim extensions such as `vim-go` or `go-vim` for the next time I do some Go programming.
- Using [Repl.it](http://repl.it/) for quick iterations, and testing out individual functions was really useful, especially with the code file growing to 400+ lines. I got into this habit recently after my mentor(and boss) recommended that I use this practice for React Native development. In React Native development, using [Snack](https://snack.expo.dev/) really helped me test new things quickly without worrying about it interacting with the whole app.
- The next time I build a Go program, I want to divide my code into multiple modules. I did it all in one file this time, But next time, I'll definitely use multiple modules. It really does become a hassle to have all your code in one file. Also, it would be good for me to learn about using vim marks, I started doing it a while back, but never got into the habit. They would be really good for when you need to create a new function, and then quickly jump back to where you were gonna use that function, which I needed to do SO many times in this project.

## What I want to do next:
- I want to pickup Rust lang, that is also a language about which I have known for a long time, but haven't gotten around to implementing anything in it. I don't know what to make in it yet, but I bet it will be fun.
- I also didn't use the main feature which Go provides which is exceptional multi-threading. I definitely want to make something which uses this feature of Go language. Perhaps some dynamic programming solutions will be cool to implement ([Map coloring algorithm](https://www.geeksforgeeks.org/graph-coloring-set-2-greedy-algorithm/)? [Iterative Forward Search](https://muller.unitime.org/lscs04.pdf)?)

## Links:
- [Repository](https://github.com/kronaemmanuel/sha256-go)
