import * as React from "react";
import TransitioningComponent from "./TransitioningComponent";
import { ISliderDirection } from "./types";
import { shallow } from "enzyme";
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
      writable: false,
    },
  );
  Object.defineProperty(dummyDom1.window.HTMLElement.prototype, "offsetWidth", {
    value: dummyParent1Width,
    writable: false,
  });

  const dummyChildren1 = React.createElement("div");

  describe("Testing all getter methods", () => {
    describe("Testing sliderHorizontalMargin property", () => {
      it("Return 0 if we don't have parent of Slider component", () => {
        // Arrange
        const dummyProps1 = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          timeout: 1,
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderHorizontalMargin).toBe(0);
      });

      it("Return 0 if we don't have parent of Slider component", () => {
        // Arrange
        const parentRef = dummyDom1.window.document.querySelector(
          ".slider",
        ) as HTMLDivElement;

        const dummyProps1 = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef,
          timeout: 1,
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderHorizontalMargin).toBe(
          dummyParent1Width - dummySliderWidth1,
        );
      });
    });

    describe("Testing sliderVerticalMargin property", () => {
      it("Return 0 if we don't have parent of Slider component", () => {
        // Arrange
        const dummyProps1 = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          timeout: 1,
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderVerticalMargin).toBe(0);
      });

      it("Return 0 if we don't have parent of Slider component", () => {
        // Arrange
        const parentRef = dummyDom1.window.document.querySelector(
          ".slider",
        ) as HTMLDivElement;

        const dummyProps1 = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef,
          timeout: 1,
        };

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps1}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        // Assert
        // @ts-ignore
        expect(wrapper.instance().sliderVerticalMargin).toBe(
          dummyParent1Height - dummySliderHeight1,
        );
      });
    });

    describe("Testing horizontalFarDistance property", () => {
      it(`Contains value equal to whole of parent container width, 
      i.e. child width + sliderHorizontalMargin if both
      fadeOnSLide and sizePercentageDuringSlide isn't present`, () => {
        // Arrange
        const dummyProps = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          timeout: 1,
        };
        const sliderHorizontalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        Object.defineProperty(wrapper.instance(), "sliderHorizontalMargin", {
          value: sliderHorizontalMargin,
          writable: false,
        });

        // Assert
        // @ts-ignore
        expect(wrapper.instance().horizontalFarDistance).toBe(
          sliderHorizontalMargin + dummySliderWidth1,
        );
      });

      it(`Contains value equal to whole of parent container width, 
      i.e. child width + %age of sliding restriction if both
      fadeOnSLide and sizePercentageDuringSlide are present`, () => {
        // Arrange
        const sizePercentageDuringSlide = 50;
        const dummyProps = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          fadeOnSlide: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          sizePercentageDuringSlide,
          timeout: 1,
        };
        const sliderHorizontalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        Object.defineProperty(wrapper.instance(), "sliderHorizontalMargin", {
          value: sliderHorizontalMargin,
          writable: false,
        });
        const slidingWidth =
          dummySliderWidth1 * (1 - sizePercentageDuringSlide / 100);

        // Assert
        // @ts-ignore
        expect(wrapper.instance().horizontalFarDistance).toBe(slidingWidth);
      });
    });

    describe("Testing verticalFarDistance property", () => {
      it(`Contains value equal to whole of parent container height, 
      i.e. child height + sliderVerticalMargin if both
      fadeOnSLide and sizePercentageDuringSlide isn't present`, () => {
        // Arrange
        const dummyProps = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          timeout: 1,
        };
        const sliderVerticalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        Object.defineProperty(wrapper.instance(), "sliderVerticalMargin", {
          value: sliderVerticalMargin,
          writable: false,
        });

        // Assert
        // @ts-ignore
        expect(wrapper.instance().verticalFarDistance).toBe(
          sliderVerticalMargin + dummySliderHeight1,
        );
      });

      it(`Contains value equal to whole of parent container width, 
      i.e. child width + %age of sliding restriction if both
      fadeOnSLide and sizePercentageDuringSlide are present`, () => {
        // Arrange
        const sizePercentageDuringSlide = 50;
        const dummyProps = {
          appear: false,
          childStyles: {
            height: dummySliderHeight1,
            transitionTime: dummySliderTime1,
            width: dummySliderWidth1,
          },
          direction: ISliderDirection.MoveLeft,
          enter: true,
          fadeOnSlide: true,
          parentRef: dummyDom1.window.document.querySelector(
            ".noslider",
          ) as HTMLDivElement,
          sizePercentageDuringSlide,
          timeout: 1,
        };
        const sliderVerticalMargin = 100;

        // Act
        const wrapper = shallow(
          <TransitioningComponent {...dummyProps}>
            {dummyChildren1}
          </TransitioningComponent>,
        );

        Object.defineProperty(wrapper.instance(), "sliderVerticalMargin", {
          value: sliderVerticalMargin,
          writable: false,
        });
        const slidingHeight =
          dummySliderHeight1 * (1 - sizePercentageDuringSlide / 100);

        // Assert
        // @ts-ignore
        expect(wrapper.instance().verticalFarDistance).toBe(slidingHeight);
      });
    });
  });
});
