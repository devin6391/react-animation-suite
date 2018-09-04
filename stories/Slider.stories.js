import React from "react";

import { storiesOf } from "@storybook/react";
import Slider from "../src/Slider/Slider";
import { wInfo } from "../storybook-utils";
import { object, boolean, number, text } from "@storybook/addon-knobs/react";

const label3 = "Sing";
const defaultValue3 = false;
const groupId3 = "GROUP-ID3";
const watchPropKnob = boolean(label3, defaultValue3, groupId3);

const label4 = "ChildProps";
const childProps = {
  firstName: "Vineet",
  lastName: "Dev",
  doesSing: defaultValue3,
  age: 27
};
const groupId4 = "GROUP-ID4";
const childPropsKnob = object(label4, childProps, groupId4);

const directionLabel = "Direction";
const directionDefault = 0;
const directionKnob = number(directionLabel, directionDefault);

const childStylesLabel = "ChildStyles";
const childStyles = {
  width: 100,
  height: 100,
  transitionTime: 0.3
};
const groupId5 = "GROUP-ID5";
const childStylesKnob = object(childStylesLabel, childStyles, groupId5);

storiesOf("Slider", module).addWithJSX(
  "basic Slider",
  wInfo(`

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Button
    label={'Enroll'}
    disabled={false}
    onClick={() => alert('hello there')}
  />
  ~~~`)(() => (
    <Slider
      watchProp={watchPropKnob}
      childProps={childPropsKnob}
      direction={directionKnob}
      childStyles={childStylesKnob}
    >
      <div
        style={{ height: "100px", width: "100px", backgroundColor: "#000", display: "block" }}
        {...childProps}
      >
        {text("hey", "hey")}
      </div>
    </Slider>
  ))
);
