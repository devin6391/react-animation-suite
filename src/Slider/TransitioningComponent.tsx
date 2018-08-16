import * as React from "react";
import { Transition } from "react-transition-group";
import {
  ISliderChildStyles,
  ISliderDirection,
  TransitionStateTypes,
  IWrapperStyles
} from "./types";

interface ITransitioningComponentProps {
  enter: any; // If true then this will enter in screen.
  classes: any; // JSS classes.
  direction: ISliderDirection; // Direction in which transition should take place.
  appear: any; // Should appear on first.
  children: any; // The child JSX passed to render
  parentRef: HTMLDivElement | null; // Reference of Slider component. Useful for getting it's parent width/height.
  childStyles: ISliderChildStyles; // Style for contained transitions.
  fadeOnSlide?: boolean; // Should it fade with transitions.
  sizePercentageDuringSlide?: number; // Percentage of size which should be there even if exit/enter is done. Useful only with fadeOnSlide prop.
  timeout: number; // Timeout under which transition should happen.
}

export default class TransitioningComponent extends React.Component<
  ITransitioningComponentProps
> {
  // Getter method for calculating horizontal margin. Useful when sliding direction is right/left.
  private get sliderHorizontalMargin(): number {
    let { parentRef, childStyles } = this.props;
    let sliderElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      sliderElemMargin =
        parentRef.parentElement.offsetWidth - childStyles.width;
    }
    return sliderElemMargin;
  }

  // Getter method for calculating vertical margin. Useful when sliding direction is up/down.
  private get sliderVerticalMargin(): number {
    let { parentRef, childStyles } = this.props;
    let sliderElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      sliderElemMargin =
        parentRef.parentElement.offsetHeight - childStyles.height;
    }
    return sliderElemMargin;
  }

  // Getter method for calculating the horizontal distance an element must travel. Useful when sliding direction is right/left.
  private get horizontalFarDistance(): number {
    let { sizePercentageDuringSlide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.width + this.sliderHorizontalMargin;
    if (fadeOnSlide && sizePercentageDuringSlide) {
      farDistance = childStyles.width * (1 - sizePercentageDuringSlide / 100);
    }
    return farDistance;
  }

  // Getter method for calculating vertical distance an element must travel. Useful when sliding direction is up/down.
  private get verticalFarDistance(): number {
    let { sizePercentageDuringSlide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.height + this.sliderVerticalMargin;
    if (fadeOnSlide && sizePercentageDuringSlide) {
      farDistance = childStyles.height * (1 - sizePercentageDuringSlide / 100);
    }
    return farDistance;
  }

  // Getter method for transform style if component is at right and is invisible. Useful when sliding direction is right/left.
  private get wrapperStyleFarRight(): string {
    return `translate3d(${this.horizontalFarDistance}px, 0, 0)`;
  }

  // Getter method for transform style if component is at left and is invisible. Useful when sliding direction is right/left.
  private get wrapperStyleFarLeft(): string {
    return `translate3d(-${this.horizontalFarDistance}px, 0, 0)`;
  }

  // Getter method for transform style if component is at up and is invisible. Useful when sliding direction is up/down.
  private get wrapperStyleFarUp(): string {
    return `translate3d(0, -${this.verticalFarDistance}px, 0)`;
  }

  // Getter method for transform style if component is at down and is invisible. Useful when sliding direction is up/down.
  private get wrapperStyleFarDown(): string {
    return `translate3d(0, ${this.verticalFarDistance}px, 0)`;
  }

  // Getter method for transform style if component is at center.
  private get wrapperTransformCenter(): string {
    return "translate3d(0, 0, 0)";
  }

  // Getter method to calculate transition exit time.
  private get sliderTransitionExitTime(): string {
    let { transitionTime, exitTransitionTime } = this.props.childStyles;
    const time = exitTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either exitTransitionTime or transitionTime should be present as props"
      );
    }
    return time + "s";
  }

  // Getter method to calculate transition enter time.
  private get sliderTransitionEnterTime(): string {
    let { transitionTime, enterTransitionTime } = this.props.childStyles;
    const time = enterTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either enterTransitionTime or transitionTime should be present as props"
      );
    }
    return time + "s";
  }

  // Getter method to calculate transition enter timing function css property.
  private get sliderEnterTimingFunction(): string {
    let { timingFunction, enterTimingFunction } = this.props.childStyles;
    return enterTimingFunction || timingFunction || "linear";
  }

  // Getter method to calculate transition exit timing function css property.
  private get sliderExitTimingFunction(): string {
    let { timingFunction, exitTimingFunction } = this.props.childStyles;
    return exitTimingFunction || timingFunction || "linear";
  }

  // Getter method to calculate css transform of entering element according to direction in which it will be transitioning.
  private get enteringTransform(): string {
    let { direction } = this.props;
    switch (direction) {
      case ISliderDirection.MoveRight:
        return this.wrapperStyleFarLeft;
      case ISliderDirection.MoveLeft:
        return this.wrapperStyleFarRight;
      case ISliderDirection.MoveUp:
        return this.wrapperStyleFarDown;
      case ISliderDirection.MoveDown:
        return this.wrapperStyleFarUp;
      default:
        throw new Error("No direction present");
    }
  }

  // Getter method to calculate css transform of exiting element according to direction in which it will be transitioning.
  private get exitingTransform(): string {
    let { direction } = this.props;
    switch (direction) {
      case ISliderDirection.MoveRight:
        return this.wrapperStyleFarRight;
      case ISliderDirection.MoveLeft:
        return this.wrapperStyleFarLeft;
      case ISliderDirection.MoveUp:
        return this.wrapperStyleFarUp;
      case ISliderDirection.MoveDown:
        return this.wrapperStyleFarDown;
      default:
        throw new Error("No direction present");
    }
  }

  // Getter method to calculate all css styles to be applied on child.
  private getWrapperStyles(
    transform: string,
    transition: string,
    opacity: number,
    transitionTimingFunction?: string
  ): IWrapperStyles {
    return { transform, transition, opacity, transitionTimingFunction };
  }

  render() {
    let {
      enter,
      classes,
      appear,
      children,
      childStyles,
      fadeOnSlide,
      timeout
    } = this.props;

    // These constants are being put here because the getter properties could get exact value before transition starts.
    // Putting it inside transition rendered block could produce undeterinistic values.
    const wrapperTransformCenter = this.wrapperTransformCenter;
    const sliderTransitionExitTime = this.sliderTransitionExitTime;
    const sliderTransitionEnterTime = this.sliderTransitionEnterTime;
    const enteringTransform = this.enteringTransform;
    const exitingTransform = this.exitingTransform;
    const sliderEnterTimingFunction = this.sliderEnterTimingFunction;
    const sliderExitTimingFunction = this.sliderExitTimingFunction;

    return (
      <Transition in={enter} timeout={timeout} appear={appear}>
        {(state: TransitionStateTypes) => {
          let wrapperStyles: IWrapperStyles;
          switch (state) {
            case "entering":
              wrapperStyles = this.getWrapperStyles(
                enteringTransform,
                "0",
                fadeOnSlide ? 0 : 1
              );
              break;
            case "entered":
              wrapperStyles = this.getWrapperStyles(
                wrapperTransformCenter,
                sliderTransitionEnterTime,
                1,
                sliderEnterTimingFunction
              );
              break;
            case "exiting":
              wrapperStyles = this.getWrapperStyles(
                wrapperTransformCenter,
                "0",
                1
              );
              break;
            case "exited":
              wrapperStyles = this.getWrapperStyles(
                exitingTransform,
                sliderTransitionExitTime,
                fadeOnSlide ? 0 : 1,
                sliderExitTimingFunction
              );
              break;
            default:
              throw new Error("Transition has no state");
          }
          return (
            <div
              className={classes.rtgWrapper}
              style={{ ...wrapperStyles, width: childStyles.width }}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}
