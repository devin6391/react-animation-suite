import React from "react";

import { storiesOf } from "@storybook/react";
import Slider from "../src/Slider/Slider";
// import { wInfo } from "../storybook-utils";
import { object, number } from "@storybook/addon-knobs/react";
import DummySliderChild from "./DummySliderChild";
import { ISliderDirection } from "../src/Slider/types";

const label3 = "Sing";
const defaultValue3 = 1;
// const groupId3 = "GROUP-ID3";
const watchPropKnob = number(label3, defaultValue3);

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

storiesOf("Slider", module).add("basic Slider", () => (
  <div style={{ width: "200px", height: "200px" }}>
    <Slider
      watchProp={watchPropKnob}
      childProps={childPropsKnob}
      direction={directionKnob}
      childStyles={childStylesKnob}
    >
      <DummySliderChild {...childProps} />
    </Slider>
  </div>
));
