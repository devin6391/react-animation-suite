### Basic Slider

A very basic example of slider. Just change the watchprop and see the functionality.
Just change the "Watch Prop" Knob to see.
This example just shows that your component will slide if watchProp is changed.

Watch prop can changed for seeing the effect.

### Usage

```js
<Slider
  watchProp={watchPropKnob}
  childProps={childPropsKnob}
  direction={directionKnob}
  childStyles={childStylesKnob}
>
  <TargetComponentToSlide {...childProps} /> // Your own component that is tageted for sliding
</Slider>
```

### To use this Storybook

Explore the panels on the left.
