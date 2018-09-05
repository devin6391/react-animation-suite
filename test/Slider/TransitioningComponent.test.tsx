import * as React from "react";
import TransitioningComponent from "../../src/Slider/TransitioningComponent";
import { TransitioningComponentChild } from "../../src/Slider/TransitioningComponentChild";
import { ISliderDirection } from "../../src/Slider/types";
import { shallow, mount } from "enzyme";
import { JSDOM } from "jsdom";

describe("Test suite for TransitioningComponent", () => {
  // Defining some constants for TransitionningComponent's style
  const dummySliderHeight1 = 200;
  const dummySliderWidth1 = 100;
  const dummySliderTime1 = 300;

  // Defining HTML for ref of TransitionningComponent's parent
  const dummyParent1Height = 400;
  const dummyParent1Width = 200;
  const dummyParent1HeightUnit = "px";
  const dummyParent1WidthUnit = "px";
  const dummyDom1 = new JSDOM(`
    <!DOCTYPE html>
    <div class="sliderParent" style="height: ${dummyParent1Height}${dummyParent1HeightUnit}; width: ${dummyParent1Width}${dummyParent1WidthUnit};">
      <div class="slider"></div>
    </div>
  `);
  Object.defineProperty(
    dummyDom1.window.HTMLElement.prototype,
    "offsetHeight",
    {
      value: dummyParent1Height,
      writable: false
    }
  );
  Object.defineProperty(dummyDom1.window.HTMLElement.prototype, "offsetWidth", {
    value: dummyParent1Width,
    writable: false
  });

  const dummyChildren1 = React.createElement("div");

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation();
  });

  describe("Testing all getter methods", () => {
    describe("Testing sliderHorizontalMargin property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("Return 0 if we don't have parent of Slider component", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderHorizontalMargin).toBe(0);
      });

      it("Return 0 if we don't have parent of Slider component", () => {
        // Arrange
        const parentRef = dummyDom1.window.document.querySelector(
          ".slider"
        ) as HTMLDivElement;
        const dummyProps1 = {
          ...dummyProps,
          parentRef
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderHorizontalMargin).toBe(
          dummyParent1Width - dummySliderWidth1
        );
      });
    });

    describe("Testing sliderVerticalMargin property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("returns 0 if we don't have parent of Slider component", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderVerticalMargin).toBe(0);
      });

      it("returns 0 if we don't have parent of Slider component", () => {
        // Arrange
        const parentRef = dummyDom1.window.document.querySelector(
          ".slider"
        ) as HTMLDivElement;

        const dummyProps1 = {
          ...dummyProps,
          parentRef
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderVerticalMargin).toBe(
          dummyParent1Height - dummySliderHeight1
        );
      });
    });

    describe("Testing horizontalFarDistance property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it(`contains value equal to whole of parent container width, 
      i.e. child width + sliderHorizontalMargin if both
      fadeOnSLide and sizePercentageDuringSlide isn't present`, () => {
        // Arrange
        const sliderHorizontalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        Object.defineProperty(wrapper.instance(), "sliderHorizontalMargin", {
          value: sliderHorizontalMargin,
          writable: false
        });

        // Assert
        // @ts-ignore
        expect(wrapper.instance().horizontalFarDistance).toBe(
          sliderHorizontalMargin + dummySliderWidth1
        );
      });

      it(`contains value equal to whole of parent container width, 
      i.e. child width + %age of sliding restriction if both
      fadeOnSLide and sizePercentageDuringSlide are present`, () => {
        // Arrange
        const sizePercentageDuringSlide = 50;
        const dummyProps1 = {
          ...dummyProps,
          fadeOnSlide: true,
          sizePercentageDuringSlide
        };
        const sliderHorizontalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        Object.defineProperty(wrapper.instance(), "sliderHorizontalMargin", {
          value: sliderHorizontalMargin,
          writable: false
        });
        const slidingWidth =
          dummySliderWidth1 * (1 - sizePercentageDuringSlide / 100);

        // Assert
        // @ts-ignore
        expect(wrapper.instance().horizontalFarDistance).toBe(slidingWidth);
      });
    });

    describe("Testing verticalFarDistance property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it(`contains value equal to whole of parent container height, 
      i.e. child height + sliderVerticalMargin if both
      fadeOnSLide and sizePercentageDuringSlide isn't present`, () => {
        // Arrange
        const sliderVerticalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        Object.defineProperty(wrapper.instance(), "sliderVerticalMargin", {
          value: sliderVerticalMargin,
          writable: false
        });

        // Assert
        // @ts-ignore
        expect(wrapper.instance().verticalFarDistance).toBe(
          sliderVerticalMargin + dummySliderHeight1
        );
      });

      it(`contains value equal to whole of parent container width, 
      i.e. child width + %age of sliding restriction if both
      fadeOnSLide and sizePercentageDuringSlide are present`, () => {
        // Arrange
        const sizePercentageDuringSlide = 50;
        const dummyProps1 = {
          ...dummyProps,
          fadeOnSlide: true,
          sizePercentageDuringSlide
        };
        const sliderVerticalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        Object.defineProperty(wrapper.instance(), "sliderVerticalMargin", {
          value: sliderVerticalMargin,
          writable: false
        });
        const slidingHeight =
          dummySliderHeight1 * (1 - sizePercentageDuringSlide / 100);

        // Assert
        // @ts-ignore
        expect(wrapper.instance().verticalFarDistance).toBe(slidingHeight);
      });
    });

    describe("Testing sliderTransitionEnterTime property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("returns enterTransitionTime if it's present alongwith transitionTime", () => {
        // Arrange
        const enterTransitionTime = dummySliderTime1 + 100;
        const childStyles = { ...dummyProps.childStyles, enterTransitionTime };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionEnterTime).toBe(
          enterTransitionTime + "s"
        );
      });

      it("returns enterTransitionTime even if transitionTime prop is not there", () => {
        // Arrange
        const enterTransitionTime = dummySliderTime1 + 100;
        const exitTransitionTime = dummySliderTime1 - 100;
        const childStyles = {
          ...dummyProps.childStyles,
          enterTransitionTime,
          exitTransitionTime
        };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionEnterTime).toBe(
          enterTransitionTime + "s"
        );
      });

      it("returns transitionTime if enterTransitionTime prop is not there", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionEnterTime).toBe(
          dummySliderTime1 + "s"
        );
      });

      it("throws error if both transitionTime and enterTransitionTime aren't present", () => {
        // Arrange
        const exitTransitionTime = dummySliderTime1 - 100;
        const childStyles = { ...dummyProps.childStyles, exitTransitionTime };
        delete childStyles.transitionTime;
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        expect(() =>
          shallow(
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });
    });

    describe("Testing sliderTransitionExitTime property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("returns exitTransitionTime if it's present alongwith transitionTime", () => {
        // Arrange
        const exitTransitionTime = dummySliderTime1 - 100;
        const childStyles = { ...dummyProps.childStyles, exitTransitionTime };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionExitTime).toBe(
          exitTransitionTime + "s"
        );
      });

      it("returns exitTransitionTime even if transitionTime prop is not there", () => {
        // Arrange
        const enterTransitionTime = dummySliderTime1 + 100;
        const exitTransitionTime = dummySliderTime1 - 100;
        const childStyles = {
          ...dummyProps.childStyles,
          enterTransitionTime,
          exitTransitionTime
        };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionExitTime).toBe(
          exitTransitionTime + "s"
        );
      });

      it("returns transitionTime if exitTransitionTime prop is not there", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderTransitionExitTime).toBe(
          dummySliderTime1 + "s"
        );
      });

      it("throws error if both transitionTime and exitTransitionTime aren't present", () => {
        // Arrange
        const enterTransitionTime = dummySliderTime1 + 100;
        const childStyles = { ...dummyProps.childStyles, enterTransitionTime };
        delete childStyles.transitionTime;
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        expect(() =>
          shallow(
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });
    });

    describe("Testing sliderEnterTimingFunction property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("return enterTimingFunction if it's provided in prop", () => {
        const enterTimingFunction = "abc";
        const timingFunction = "def";
        const childStyles = {
          ...dummyProps.childStyles,
          enterTimingFunction,
          timingFunction
        };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderEnterTimingFunction).toBe(
          enterTimingFunction
        );
      });

      it("returns timingFunction if enterTimingFunction is not provided in prop", () => {
        const timingFunction = "def";
        const childStyles = {
          ...dummyProps.childStyles,
          timingFunction
        };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderEnterTimingFunction).toBe(
          timingFunction
        );
      });

      it("returns linear if both timingFunction and enterTimingFunction are not provided in prop", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderEnterTimingFunction).toBe("linear");
      });
    });

    describe("Testing sliderExitTimingFunction property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        direction: ISliderDirection.MoveLeft,
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".noslider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("return exitTimingFunction if it's provided in prop", () => {
        const exitTimingFunction = "abc";
        const timingFunction = "def";
        const childStyles = {
          ...dummyProps.childStyles,
          exitTimingFunction,
          timingFunction
        };
        const dummyProps1 = { ...dummyProps, childStyles };
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderExitTimingFunction).toBe(
          exitTimingFunction
        );
      });

      it("returns timingFunction if exitTimingFunction is not provided in prop", () => {
        const timingFunction = "def";
        const childStyles = {
          ...dummyProps.childStyles,
          timingFunction
        };
        const dummyProps1 = { ...dummyProps, childStyles };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderExitTimingFunction).toBe(
          timingFunction
        );
      });

      it("returns linear if both timingFunction and exitTimingFunction are not provided in prop", () => {
        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>
        );

        // @ts-ignore
        expect(wrapper.instance().sliderExitTimingFunction).toBe("linear");
      });
    });

    describe("Testing enteringTransform property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".slider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("returns wrapper style for far left position if transitioning element is moving right", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveRight
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.enteringTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarLeft
        );
      });

      it("returns wrapper style for far right position if transitioning element is moving left", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveLeft
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.enteringTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarRight
        );
      });

      it("returns wrapper style for far down position if transitioning element is moving up", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveUp
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.enteringTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarDown
        );
      });

      it("returns wrapper style for far up position if transitioning element is moving down", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveDown
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.enteringTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarUp
        );
      });

      it("throws if direction isn't present", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps
        };

        // Act
        expect(() =>
          shallow(
            // @ts-ignore
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });

      it("throws if direction is present but has no value corresponding to left, right, up or down", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: 7
        };

        // Act
        expect(() =>
          shallow(
            // @ts-ignore
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });
    });

    describe("Testing exitingTransform property", () => {
      const dummyProps = {
        appear: false,
        childStyles: {
          height: dummySliderHeight1,
          transitionTime: dummySliderTime1,
          width: dummySliderWidth1
        },
        enter: true,
        parentRef: dummyDom1.window.document.querySelector(
          ".slider"
        ) as HTMLDivElement,
        timeout: 1
      };

      it("returns wrapper style for far right position if transitioning element is moving right", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveRight
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.exitingTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarRight
        );
      });

      it("returns wrapper style for far left position if transitioning element is moving left", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveLeft
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.exitingTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarLeft
        );
      });

      it("returns wrapper style for far up position if transitioning element is moving up", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveUp
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.exitingTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarUp
        );
      });

      it("returns wrapper style for far down position if transitioning element is moving down", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: ISliderDirection.MoveDown
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>
        );
        const instance = wrapper.instance();

        // Assert
        // @ts-ignore
        expect(instance.exitingTransform).toEqual(
          // @ts-ignore
          instance.wrapperStyleFarDown
        );
      });

      it("throws if direction isn't present", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps
        };

        // Act
        expect(() =>
          shallow(
            // @ts-ignore
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });

      it("throws if direction is present but has no value corresponding to left, right, up or down", () => {
        // Arrange
        const dummyProps1 = {
          ...dummyProps,
          direction: 7
        };

        // Act
        expect(() =>
          shallow(
            // @ts-ignore
            <TransitioningComponent {...dummyProps1}>
              {dummyChildren1}
            </TransitioningComponent>
          )
        ).toThrow();
      });
    });
  });

  describe("Testing render method", () => {
    const dummyProps = {
      appear: false,
      childStyles: {
        height: dummySliderHeight1,
        transitionTime: dummySliderTime1,
        width: dummySliderWidth1
      },
      direction: ISliderDirection.MoveLeft,
      enter: true,
      parentRef: dummyDom1.window.document.querySelector(
        ".slider"
      ) as HTMLDivElement,
      timeout: 1
    };

    const fullWrapper = mount(
      <TransitioningComponent {...dummyProps}>
        {dummyChildren1}
      </TransitioningComponent>
    );

    it("contains one TransitioningComponentChild component", () => {
      expect(fullWrapper.find(TransitioningComponentChild).length).toBe(1);
    });

    it("contains the children passed inside it's prop", () => {
      expect(fullWrapper.prop("children")).toBe(dummyChildren1);
    });

    it("calls addEndListener when transition completes", () => {
      setTimeout(() => {
        // @ts-ignore
        expect(fullWrapper.instance().addEndListener).toHaveBeenCalled();
      }, dummySliderTime1);
    });

    it("calls transitionEndCallback prop if it's provided", () => {
      const transitionEndCallback = jest.fn();
      const dummyProps1 = { ...dummyProps, transitionEndCallback };
      shallow(
        <TransitioningComponent {...dummyProps1}>
          {dummyChildren1}
        </TransitioningComponent>
      );
      setTimeout(() => {
        expect(transitionEndCallback.mock.calls.length).toBe(1);
      }, dummySliderTime1);
    });
  });
});
