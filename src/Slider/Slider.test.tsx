import * as React from "react";
import Slider from "./Slider";
import { ISliderDirection } from "./types";
import { mount } from "enzyme";

describe("Test slider component", () => {
  const dummyChildren1 = React.createElement("div");
  const dummyProps1 = {
    childProps: {
      bar: 2,
      foo: 1,
    },
    childStyles: {
      height: 100,
      width: 100,
    },
    direction: ISliderDirection.MoveDown,
    watchProp: 0,
  };
  describe('First mounting of Slider component', () => {
    beforeEach(() => {
      jest.spyOn(Slider, "getDerivedStateFromProps");
    });
    it("Checks if getDerivedStateFromProps is called whenever Slider is mounted", () => {
      const SliderWrapper = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
      );
      expect(Slider.getDerivedStateFromProps).toHaveBeenCalled();
      expect(SliderWrapper.prop("children")).toBe(dummyChildren1);
    });
  });
});
