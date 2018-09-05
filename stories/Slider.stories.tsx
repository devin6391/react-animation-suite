import React from "react";

import { storiesOf } from "@storybook/react";
import Slider from "../src/Slider/Slider";
import { object, number } from "@storybook/addon-knobs/react";
import DummySliderChild from "./DummySliderChild";
import { ISliderDirection } from "../src/Slider/types";
import { wInfo } from "../storybook-utils";

const label4 = "ChildProps";
const childProps = {
  age: 27,
  doesSing: false,
  firstName: "Vineet",
  lastName: "Dev"
};
const groupId4 = "GROUP-ID4";
const childPropsKnob = object(label4, childProps, groupId4);

const directionLabel = "Direction";
const directionDefault = ISliderDirection.MoveLeft;
const directionKnob = number(directionLabel, directionDefault);

const childStylesLabel = "ChildStyles";
const childStyles = {
  height: 100,
  transitionTime: 0.3,
  width: 100
};
const groupId5 = "GROUP-ID5";
const childStylesKnob = object(childStylesLabel, childStyles, groupId5);

const stories = storiesOf("Slider", module);

stories.addWithJSX(
  "Slider",

  wInfo(`
    ### Basic Slider
    A very basic example of slider. Just change the watchprop and see the functionality.
    Just change the "Watch Prop" Knob to see.
    This example just shows that your component will slide if watchProp is changed.

    ### Usage
    ~~~js
      <Slider
        watchProp={watchPropKnob}
        childProps={childPropsKnob}
        direction={directionKnob}
        childStyles={childStylesKnob}
      >
        <TargetComponentToSlide {...childProps} /> // Your own component that is tageted for sliding
      </Slider>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.
  `)(() => {
    const label3 = "Watch Prop";
    const defaultValue3 = 1;
    const watchPropKnob = number(label3, defaultValue3);
    return (
      <div style={{ height: "100px", width: "200px" }}>
        <Slider
          watchProp={watchPropKnob}
          childProps={childPropsKnob}
          direction={directionKnob}
          childStyles={childStylesKnob}
        >
          <DummySliderChild {...childProps} />
        </Slider>
      </div>
    );
  })
);
