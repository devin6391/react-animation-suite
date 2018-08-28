import * as React from "react";
import TransitioningComponentChild from "../../src/Slider/TransitioningComponentChild";
import { TransitionStateTypes } from "../../src/Slider/types";
import { shallow } from "enzyme";
import * as Utils from "../../src/Slider/utils";

describe("Test TransitioningComponentChild", () => {
  const dummyCssWrapperStyle = { display: "block" };
  const dummyProps = {
    child: React.createElement("div"),
    cssWrapperStyle: dummyCssWrapperStyle,
    enteringTransform: "100px",
    exitingTransform: "200px",
    fadeOnSlide: false,
    sliderEnterTimingFunction: "foo",
    sliderExitTimingFunction: "bar",
    sliderTransitionEnterTime: "40s",
    sliderTransitionExitTime: "20s",
    state: "enter",
    wrapperTransformCenter: "10px"
  };

  beforeEach(() => {
    spyOn(Utils, "getWrapperStyles").and.returnValue(dummyCssWrapperStyle);
  });

  describe("Render method functionality", () => {
    it(`If the state is entering then render method calls getWrapperStyles with:
    transform being enteringTransform,
    no transition and
    opacity as 1 if fadeOnSlide is not present`, () => {
      const state: TransitionStateTypes = "entering";
      const dummyProps1 = { ...dummyProps, state };
      delete dummyProps1.fadeOnSlide;
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.enteringTransform,
        "0",
        1
      );
    });

    it(`If the state is entered then render method calls getWrapperStyles with:
    transform being enteringTransform,
    no transition and
    opacity as 1 if fadeOnSlide is present and is false`, () => {
      const state: TransitionStateTypes = "entering";
      const dummyProps1 = { ...dummyProps, state };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.enteringTransform,
        "0",
        1
      );
    });

    it(`If the state is entering then render method calls getWrapperStyles with:
    transform being enteringTransform,
    no transition and
    opacity as 0 if fadeOnSlide is present and is true`, () => {
      const state: TransitionStateTypes = "entering";
      const dummyProps1 = { ...dummyProps, state, fadeOnSlide: true };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.enteringTransform,
        "0",
        0
      );
    });

    it(`If the state is entered then render method calls getWrapperStyles with:
    transform being center transform,
    transitioning with duration of enter transition time,
    opacity as 1 and
    transition timing function being that of enter`, () => {
      const state: TransitionStateTypes = "entered";
      const dummyProps1 = { ...dummyProps, state };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.wrapperTransformCenter,
        dummyProps.sliderTransitionEnterTime,
        1,
        dummyProps.sliderEnterTimingFunction
      );
    });

    it(`If the state is exiting then render method calls getWrapperStyles with:
    transform being center transform,
    no transition and
    opacity as 1`, () => {
      const state: TransitionStateTypes = "exiting";
      const dummyProps1 = { ...dummyProps, state };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.wrapperTransformCenter,
        "0",
        1
      );
    });

    it(`If the state is exited then render method calls getWrapperStyles with:
    transform being exiting transform,
    transitioning with duration of exit transition time,
    opacity as 1 if fadeOnSlide is not present and
    transition timing function being that of exit`, () => {
      const state: TransitionStateTypes = "exited";
      const dummyProps1 = { ...dummyProps, state };
      delete dummyProps1.fadeOnSlide;
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.exitingTransform,
        dummyProps.sliderTransitionExitTime,
        1,
        dummyProps.sliderExitTimingFunction
      );
    });

    it(`If the state is exited then render method calls getWrapperStyles with:
    transform being exiting transform,
    transitioning with duration of exit transition time,
    opacity as 1 if fadeOnSlide is present but false and
    transition timing function being that of exit`, () => {
      const state: TransitionStateTypes = "exited";
      const dummyProps1 = { ...dummyProps, state, fadeOnSlide: false };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.exitingTransform,
        dummyProps.sliderTransitionExitTime,
        1,
        dummyProps.sliderExitTimingFunction
      );
    });

    it(`If the state is exited then render method calls getWrapperStyles with:
    transform being exiting transform,
    transitioning with duration of exit transition time,
    opacity as 1 if fadeOnSlide is present with value of true and
    transition timing function being that of exit`, () => {
      const state: TransitionStateTypes = "exited";
      const dummyProps1 = { ...dummyProps, state, fadeOnSlide: true };
      shallow(<TransitioningComponentChild {...dummyProps1} />);
      expect(Utils.getWrapperStyles).toHaveBeenCalledWith(
        dummyProps.exitingTransform,
        dummyProps.sliderTransitionExitTime,
        0,
        dummyProps.sliderExitTimingFunction
      );
    });

    it("throws if state is not present", () => {
      const dummyProps1 = { ...dummyProps };
      delete dummyProps1.state;
      expect(() =>
        // @ts-ignore
        shallow(<TransitioningComponentChild {...dummyProps1} />)
      ).toThrow();
    });

    it("throws if state is present but not of type TransitionStateTypes", () => {
      const state = "foo";
      const dummyProps1 = { ...dummyProps, state };
      delete dummyProps1.state;
      expect(() =>
        // @ts-ignore
        shallow(<TransitioningComponentChild {...dummyProps1} />)
      ).toThrow();
    });
  });
});
