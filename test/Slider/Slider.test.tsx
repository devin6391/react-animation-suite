import * as React from "react";
import Slider from "../../src/Slider/Slider";
import TransitioningComponent from "../../src/Slider/TransitioningComponent";
import { ISliderDirection, SliderCycleState } from "../../src/Slider/types";
import { shallow, mount } from "enzyme";

describe("Test slider component", () => {
  // Arrange
  const dummyChildren1 = React.createElement("div");
  const dummyProps1 = {
    childProps: {
      bar: 2,
      foo: 1
    },
    childStyles: {
      height: 100,
      width: 100
    },
    direction: ISliderDirection.MoveDown,
    watchProp: 0
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation();
  });

  describe("First mounting of Slider component", () => {
    beforeEach(() => {
      // Arrange
      jest.spyOn(Slider, "getDerivedStateFromProps");
    });

    it("Checks if getDerivedStateFromProps is called and passed ReactElement to be in 'children' prop whenever Slider is mounted", () => {
      // Arrange
      const SliderWrapper = mount(
        <Slider {...dummyProps1}>{dummyChildren1}</Slider>
      );

      // Assert
      expect(Slider.getDerivedStateFromProps).toHaveBeenCalled();
      expect(SliderWrapper.prop("children")).toBe(dummyChildren1);
    });
  });

  describe("Updating Slider component", () => {
    // Arrange
    const SliderShallowWrapper = shallow(
      <Slider {...dummyProps1}>{dummyChildren1}</Slider>
    );
    const SliderFullWrapper = mount(
      <Slider {...dummyProps1}>{dummyChildren1}</Slider>
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
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: 1,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1
      };
      jest.spyOn(Slider.prototype, "render");

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      expect(Slider.prototype.render).toHaveBeenCalled();
    });

    it("TransitionCycle is in Start state initially when transition starts due to updation", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      // @ts-ignore
      expect(SliderFullWrapper.instance().transitionCycle).toEqual(
        SliderCycleState.Start
      );
    });

    it("Transition cycle is in Full state when transition ends after an updation", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1
      };

      // Act
      SliderFullWrapper.setProps(dummyProps2);

      // Assert
      setTimeout(() => {
        // @ts-ignore
        expect(SliderFullWrapper.instance().transitionCycle).toEqual(
          SliderCycleState.Full
        );
      }, transitionDuration);
    });

    it("Call transition done callback function if provided in props", () => {
      // Arrange
      const transitionDoneCallback = jest.fn();
      const dummyProps2 = {
        childProps: {
          bar: 2,
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        transitionDone: transitionDoneCallback,
        watchProp: 1
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
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1
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
          foo: 1
        },
        childStyles: {
          height: 100,
          transitionTime: transitionDuration,
          width: 100
        },
        direction: ISliderDirection.MoveDown,
        watchProp: 1
      };

      setTimeout(() => {
        // Act
        SliderFullWrapper.setProps(dummyProps2);

        // Assert
        expect(SliderFullWrapper.find(TransitioningComponent).length).toBe(2);
      }, transitionDuration);
    });
  });

  describe("Testing class properties", () => {
    const dummyProps = {
      childProps: {
        bar: 2,
        foo: 1
      },
      childStyles: {
        height: 100,
        transitionTime: 100,
        width: 100
      },
      direction: ISliderDirection.MoveDown
    };

    describe("Testing beforeUpdationProcess", () => {
      it("Throws error if updated watchProp is undefined", () => {
        // Arrange
        const SliderFullWrapper2 = mount(
          <Slider {...dummyProps1}>{dummyChildren1}</Slider>
        );
        const dummyProps2 = { ...dummyProps, watchProp: undefined };

        // Assert
        expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
      });

      it("Throws error if updated watchProp is null", () => {
        // Arrange
        const SliderFullWrapper2 = mount(
          <Slider {...dummyProps1}>{dummyChildren1}</Slider>
        );
        const dummyProps2 = { ...dummyProps, watchProp: null };

        // Assert
        expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
      });

      it("Throws error if updated watchProp is not a primitive type value", () => {
        // Arrange
        const SliderFullWrapper2 = mount(
          <Slider {...dummyProps1}>{dummyChildren1}</Slider>
        );
        const dummyProps2 = { ...dummyProps, watchProp: { a: 1 } };

        // Assert
        expect(() => SliderFullWrapper2.setProps(dummyProps2)).toThrow();
      });

      it("changing props(to continuosly slide) more than one time before transitionCycle gets complete gives warning", () => {
        spyOn(console, "warn");

        const SlideWrapper = mount(
          <Slider {...dummyProps1}>{dummyChildren1}</Slider>
        );

        const dummyProps2 = { ...dummyProps, watchProp: 1 };
        SlideWrapper.setProps(dummyProps2);

        const dummyProps3 = { ...dummyProps, watchProp: 2 };
        SlideWrapper.setProps(dummyProps3);

        expect(console.warn).toBeCalled();
      });

      it("Set firstRender to false if it was first render", () => {
        const slideWrapper = shallow(
          <Slider {...dummyProps1}>{dummyChildren1}</Slider>
        );

        // @ts-ignore
        expect(slideWrapper.instance().firstRender).toBeFalsy();
      });

      it("Set transitionCycle to start if it was not first render and next rerender is after provided transitionTime", () => {
        const dummyProps2 = { ...dummyProps, watchProp: 0 };
        const slideWrapper = mount(
          <Slider {...dummyProps2}>{dummyChildren1}</Slider>
        );

        setTimeout(() => {
          const dummyProps3 = { ...dummyProps, watchProp: 2 };
          slideWrapper.setProps(dummyProps3);
          // @ts-ignore
          expect(slideWrapper.instance().transitionCycle).toBe(
            SliderCycleState.Start
          );
        }, dummyProps2.childStyles.transitionTime);
      });
    });

    describe("Testing getCLonedElems property", () => {
      const dummyProps2 = { ...dummyProps, watchProp: 1 };
      const slideWrapper = mount(
        <Slider {...dummyProps2}>{dummyChildren1}</Slider>
      );

      it("returns an array of containing only one element on first render", () => {
        // @ts-ignore
        expect(slideWrapper.instance().getCLonedElems().length).toBe(1);
      });

      it("returns an array of containing only two elements on subsequent re-renders", () => {
        const dummyProps3 = { ...dummyProps, watchProp: 2 };
        slideWrapper.setProps(dummyProps3);
        // @ts-ignore
        expect(slideWrapper.instance().getCLonedElems().length).toBe(2);
      });
    });

    describe("Testing enterTransitionDone property", () => {
      const dummyProps2 = { ...dummyProps, watchProp: 1 };
      const slideWrapper = shallow(
        <Slider {...dummyProps2}>{dummyChildren1}</Slider>
      );
      it("sets transitionCycle to be FULL", () => {
        // @ts-ignore
        slideWrapper.instance().enterTransitionDone();
        // @ts-ignore
        expect(slideWrapper.instance().transitionCycle).toBe(
          SliderCycleState.Full
        );
      });
    });
  });
});
