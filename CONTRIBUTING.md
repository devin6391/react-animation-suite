I am really glad you're reading this, because we developers should collaborate to help this project come to fruition. 👏

## Instructions

These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

		git clone https://github.com/YOUR-USERNAME/react-animation-suite
		npm install

### Keep in mind the problems that we need to solve:
  - Animation libraries are very opinionated about how animations should be done, how to implement timings, stiffness, etc.
  - Almost all libraries require a lot of learning before implementing. It's not like you know react and you have animation component from library, then you can simply use it just like that.
  - Animation libraries tend to do magic underneath, reading them is a difficult task if you want to know their internal working. So it is difficult to contribute in them.
  - Implementing many animation libraries requires to be implemented from starting. Using a library in the middle or end of development is very tough.

### Commit
Always run `npm run commit` to commit your changes after staging them. This library is using [commitizen][df1]

### Using typescript and react transition group
Its mandatory to code in typescript and use react transition group. In some cases, you may not want react-transition-group, but the main goal is to acheive clean solution. Try not to use any external animation library unless it is something kickass!

### Some important note on React Transition Group's usage in this repo:
* We can think of React Transition Group as a low level API provider for doing animations.
* Many people create animation libraries for react on top of some existing javascript animation library by using react transition group. But focus of this library is not that, we want developers to easily reason about animation components based on simple js and css knowledge rather than making a React wrapper of some existing javascript animation library.
* We should try to create animations on pure css and javascript. But no one is stopping to use an external library unless it's simple to reason about and easy to implement for a normal react developer.

### Local build and testing
`npm link` or `yarn link` won't work well. So, this project has [yalc][df2]. Its very easy to use. Just do `npm run build` and then do `yalc publish`. In the consumer project do `yalc add react-transition-group`. This will link your local bundled changes in consumer pretty well.

Make and commit your changes. Make sure the commands npm run build and npm run test:prod are working.

You can use [project board][df3] if you like. It will nicely show up issues and work items.

Finally send a [GitHub Pull Request](https://github.com/devin6391/react-animation-suite/compare?expand=1) with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).

[df1]: <https://github.com/commitizen>
[df2]: <https://github.com/whitecolor/yalc>
[df3]: <https://github.com/devin6391/react-animation-suite/projects/1>
