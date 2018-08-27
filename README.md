[![Build Status](https://travis-ci.org/devin6391/react-animation-suite.svg?branch=master)](https://travis-ci.org/devin6391/react-animation-suite) [![Coverage Status](https://coveralls.io/repos/github/devin6391/react-animation-suite/badge.svg)](https://coveralls.io/github/devin6391/react-animation-suite) [![npm version](https://badge.fury.io/js/react-animation-suite.svg)](https://badge.fury.io/js/react-animation-suite) [![Maintainability](https://api.codeclimate.com/v1/badges/0e5410157a52f7adebf0/maintainability)](https://codeclimate.com/github/devin6391/react-animation-suite/maintainability)

# React Animation Suite

## Finally an animation library which is developer friendly!

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

Say you have a component whose JSX is like below:

    <div className="container">
        <WannabeSlider {...props} />
    </div>

Now you can slide the WannabeSlider like this:

 <div className="container">
<Slider {...sliderProps}>
<WannabeSlider {...props} />
</Slider>
</div>

## Problem Statement

- Animation libraries are very opinionated about how animations should be done, how to implement timings, stiffness, etc.
- Almost all libraries require a lot of learning before implementing. It's not like you know react and you have animation component being exported from library, then you can simply use it just like that.
- Animation libraries tend to do magic underneath, reading their source code is a difficult task if you want to know their internal working. So it is difficult to contribute in them.
- Implementing many animation libraries requires a developer to implement it from starting. Using a library in the middle or end stage of development is very tough.

### Solving it is little opinionated from my point of view, but any improvement is welcome. Right now I am trying to follow below points:

- Do not create DOM elements for consumer(developer implementing this library), many Slider libraries do so.
- Do not handle dom events, observables, timeouts or any async operation for consumer. If something can cause bad user experience then throw an error or give warning.
- Take least data from consumer.
- Provide more control to consumer.
- Taking data or providing controls should be done only through props. In case of HOCs, it should be simple json config data.
- Animation should be generic for any scenario that a developer may face, but it should be specific for a particular animation type, ex. Slider.
- **Most important of all** - Applying animation should be like decorating a component. Animation components should not affect the logic of developer's component and it should not be thought prior to development of any component. A developer should be allowed to develop his/her component and then apply animation, or remove it. Of course he/she can apply animation in a component while initial development. But whenever a developer wants to apply it or remove it, his/her component should not break and it should function in the same way. [Checkout the codesandbox](https://codesandbox.io/embed/7377yqr9vj). Keep your eyes on two components - _SliderWithAnimation_ and _SliderWithoutAnimation_. Just check the render method of both(rest of the code is just any other react typescript app). Check how _SingleElement_ is written in both, and you will know how easy it is to implement _Slider_ provided from this library.

#### Embedded example of Slider

[![Edit 7377yqr9vj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7377yqr9vj)

#### This library is here to solve all these problems. And if you are contributing, which is what all of us should do, you must think of solving all those above problems.

# Features

- For now we have only Slider component.

### Tech

- [ReactJS] - Obvious!
- [React Transition Group] - This library is being used internally. This is a transition state management library and is very simple. Please read about how to use this in `CONTRIBUTING.md`.
- [Typescript] - This won't be downloaded as dependency, but just to point out - I am using typescript and I would suggest other developers to use typescript as it makes life so good!!!

##### Don't get intimidated by typescript if you don't know it. You can use this library in your **plain javascript** project too!

Note -- There is no flow implementation as of now but if someone can contribute for that, it will be great.

### Development

Want to contribute? Great!

Please read `CONTRIBUTING.md`.

#### Special thanks to [TypeScript library starter](https://github.com/alexjoverm/typescript-library-starter) for simplifying the process to create a javascript library with typescript.

[reactjs]: https://reactjs.org/
[react transition group]: https://reactcommunity.org/react-transition-group/
[typescript]: https://www.typescriptlang.org/
