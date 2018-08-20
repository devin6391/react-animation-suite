# React Animation Suite

## Finally, An animation library which is developer friendly!
This library is unopinionated about what should be the theory of animation, rather it focuses on how it should be implemented in React.

## Usage
#### Install
    npm i react-animation-suite -g
        OR
    yarn add react-animation-suite

#### Importing
    import { Slider } from "react-animation-suite"
        OR
    import { Slider } from "react-transition-suite/dist/lib/Slider"
    
#### Using
Say you component had JSX like this:

    <div className="container">
        <WannabeSlider {...props} />
    </div>
    
Now you can slide the WannabeSlider almost like this:
    
    <div className="container">
        <Slider {...sliderProps}>
            <WannabeSlider {...props} />
        </Slider>
    </div>
    

## Problem Statement
  - Animation libraries are very opinionated about how animations should be done, how to implement timings, stiffness, etc.
  - Almost all libraries require a lot of learning before implementing. It's not like you know react and you have animation component from library, then you can simply use it just like that.
  - Animation libraries tend to do magic underneath, reading them is a difficult task if you want to know their internal working. So it is difficult to contribute in them.
  - Implementing many animation libraries requires to be implemented from starting. Using a library in the middle or end of development is very tough.
 
#### This library is here to solve all these problems. Even if you are contributing, which is what all of us should do, you must think of solving all those above problems.

# Features
  - For now we have only Slider component.


You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop markdown and HTML files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

* [ReactJS] - Obvious!
* [React Transition Group] - This library internally uses react transition group. And rather than making a React wrapper of current library, we try to create animations on pure css or javascript.
* [Typescript] - This won't be downloaded as dependency, but just to point out - we are using typescript and we would suggest other developers to use typescript.

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.


### Development
Want to contribute? Great!

Please read `CONTRIBUTING.md`.


   [ReactJS]: <https://reactjs.org/>
   [React Transition Group]: <https://reactcommunity.org/react-transition-group/>
   [Typescript]: <https://www.typescriptlang.org/>
