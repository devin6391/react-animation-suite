import * as React from "react";
import Slider from "./Slider";
import TransitioningComponent from "./TransitioningComponent";
import { ISliderDirection, SliderCycleState } from "./types";
import { shallow, mount } from "enzyme";

describe("Test slider component", () => {
  // Arrange
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

  describe("First mounting of Slider component", () => {
    beforeEach(() => {
      // Arrange
      jest.spyOn(Slider, "getDerivedStateFromProps");
    });

    it("Checks if getDerivedStateFromProps is called and passed ReactElement to be in 'children' prop whenever Slider is mounted", () => {
      // Arrange
      const SliderWrapper = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
      );

      // Assert
      expect(Slider.getDerivedStateFromProps).toHaveBeenCalled();
      expect(SliderWrapper.prop("children")).toBe(dummyChildren1);
    });
  });

  describe("Updating Slider component", () => {
    // Arrange
    const SliderShallowWrapper = shallow(
      <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
    );
    const SliderFullWrapper = mount(
      <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
    );
    const transitionDuration = 100;

    beforeEach(() => {
      // Arrange
      jest.spyOn(Slider, "getDerivedStateFromProps");
      // jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
    });

    it("Checks if getDerivedStateFromProps is called whenever Slider is updated", () => {
      // Act
      SliderShallowWrapper.update();

      // Assert
      expect(Slider.getDerivedStateFromProps).toHaveBeenCalled();
    });

    it("Rerenders when watchprop changes", () => {
      // Arrange
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: 1,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1,
      };
      jest.spyOn(Slider.prototype, "render");

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      expect(Slider.prototype.render).toHaveBeenCalled();
    });

    it("Transition cycle is in Start state initially when transition starts due to updation", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1,
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      // @ts-ignore
      expect(SliderFullWrapper.instance().transitionCycle).toEqual(
        SliderCycleState.Start,
      );
    });

    it("Transition cycle is in Full state when transition ends after an updation", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1,
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      setTimeout(() => {
        // @ts-ignore
        expect(SliderFullWrapper.instance().transitionCycle).toEqual(
          SliderCycleState.Full,
        );
      }, transitionDuration);
    });

    it("Call transition done callback function if provided in props", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1,
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      setTimeout(() => {
        expect(transitionDoneCallback.mock.calls.length).toBe(1);
      }, transitionDuration);
    });

    it("Do not call transition done callback function if not provided in props", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1,
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      setTimeout(() => {
        expect(transitionDoneCallback.mock.calls.length).toBe(0);
      }, transitionDuration);
    });

    it("Contains two TransitioningComponents when transitioning", () => {
      // Arrange
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1,
      };

      setTimeout(() => {
        // Act
        SliderFullWrapper.setProps(dummyProps2);

        // Assert
        expect(SliderFullWrapper.find(TransitioningComponent).length).toBe(2);
      }, transitionDuration);
    });

    it("Throws error if updated watchProp is undefined", () => {
      // Arrange
      const SliderFullWrapper2 = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
      );
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: undefined,
      };

      // Assert
      expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
    });

    it("Throws error if updated watchProp is null", () => {
      // Arrange
      const SliderFullWrapper2 = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
      );
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: null,
      };

      // Assert
      expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
    });

    it("Throws error if updated watchProp is not a primitive type value", () => {
      // Arrange
      const SliderFullWrapper2 = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>,
      );
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1,
        },
        childStyles: {
          height: 100,
          width: 100,
        },
        direction: ISliderDirection.MoveDown,
        watchProp: { a: 1 },
      };

      // Assert
      expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
    });
  });
});
