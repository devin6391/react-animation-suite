import * as React from "react";
import getSliderStyles from "./styles";
import TransitioningComponentChild, {
  ITransitioningComponentChildProps,
} from "./TransitioningComponentChild";
import {
  ISliderChildStyles,
  ISliderDirection,
  TransitionStateTypes,
} from "./types";
import { Transition } from "react-transition-group";

interface ITransitioningComponentProps {
  enter: boolean; // If true then this will enter in screen.
  direction: ISliderDirection; // Direction in which transition should take place.
  appear: boolean; // Should appear on first.
  children: JSX.Element; // The child JSX passed to render
  parentRef: HTMLDivElement | null; // Reference of Slider component. Useful for getting it's parent width/height.
  childStyles: ISliderChildStyles; // Style for contained transitions.
  timeout: number; // Timeout under which transition should happen.
  fadeOnSlide?: boolean; // Should it fade with transitions.
  sizePercentageDuringSlide?: number; // % of size which should be in screen. Useful only with fadeOnSlide prop.
  transitionEndCallback?: () => void; // Callback telling end of transition.
}

export default class TransitioningComponent extends React.Component<
  ITransitioningComponentProps
> {
  public render() {
    const { enter, appear, children, fadeOnSlide, timeout } = this.props;

    // These constants are being put here because the getter properties could get exact value before transition starts.
    // Putting it inside transition rendered block could produce undeterinistic values.
    const partialTransitioningComponentChildProps = {
      child: children,
      cssWrapperStyle: this.cssWrapperStyle,
      enteringTransform: this.enteringTransform,
      exitingTransform: this.exitingTransform,
      fadeOnSlide: fadeOnSlide || false,
      sliderEnterTimingFunction: this.sliderEnterTimingFunction,
      sliderExitTimingFunction: this.sliderExitTimingFunction,
      sliderTransitionEnterTime: this.sliderTransitionEnterTime,
      sliderTransitionExitTime: this.sliderTransitionExitTime,
      wrapperTransformCenter: this.wrapperTransformCenter,
    };

    const renderState = (state: TransitionStateTypes) => {
      return this.renderTransitioningChild({
        ...partialTransitioningComponentChildProps,
        state,
      });
    };

    return (
      <Transition
        in={enter}
        timeout={timeout}
        appear={appear}
        addEndListener={this.addEndListener}
      >
        {renderState}
      </Transition>
    );
  }

  // Getter method for calculating horizontal margin
  // Useful when sliding direction is right/left.
  private get sliderHorizontalMargin(): number {
    const { parentRef, childStyles } = this.props;
    let sliderElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      sliderElemMargin =
        parentRef.parentElement.offsetWidth - childStyles.width;
    }
    return sliderElemMargin;
  }

  // Getter method for calculating vertical margin
  // Useful when sliding direction is up/down.
  private get sliderVerticalMargin(): number {
    const { parentRef, childStyles } = this.props;
    let sliderElemMargin = 0;
    if (parentRef && parentRef.parentElement) {
      sliderElemMargin =
        parentRef.parentElement.offsetHeight - childStyles.height;
    }
    return sliderElemMargin;
  }

  // Getter method for calculating the horizontal distance an element must travel.
  // Useful when sliding direction is right/left.
  private get horizontalFarDistance(): number {
    const { sizePercentageDuringSlide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.width + this.sliderHorizontalMargin;
    if (fadeOnSlide && sizePercentageDuringSlide) {
      farDistance = childStyles.width * (1 - sizePercentageDuringSlide / 100);
    }
    return farDistance;
  }

  // Getter method for calculating vertical distance an element must travel.
  // Useful when sliding direction is up/down.
  private get verticalFarDistance(): number {
    const { sizePercentageDuringSlide, childStyles, fadeOnSlide } = this.props;
    let farDistance = childStyles.height + this.sliderVerticalMargin;
    if (fadeOnSlide && sizePercentageDuringSlide) {
      farDistance = childStyles.height * (1 - sizePercentageDuringSlide / 100);
    }
    return farDistance;
  }

  // Getter method for transform style if component is at right and is invisible.
  // Useful when sliding direction is right/left.
  private get wrapperStyleFarRight(): string {
    return `translate3d(${this.horizontalFarDistance}px, 0, 0)`;
  }

  // Getter method for transform style if component is at left and is invisible.
  // Useful when sliding direction is right/left.
  private get wrapperStyleFarLeft(): string {
    return `translate3d(-${this.horizontalFarDistance}px, 0, 0)`;
  }

  // Getter method for transform style if component is at up and is invisible.
  // Useful when sliding direction is up/down.
  private get wrapperStyleFarUp(): string {
    return `translate3d(0, -${this.verticalFarDistance}px, 0)`;
  }

  // Getter method for transform style if component is at down and is invisible.
  // Useful when sliding direction is up/down.
  private get wrapperStyleFarDown(): string {
    return `translate3d(0, ${this.verticalFarDistance}px, 0)`;
  }

  // Getter method for transform style if component is at center.
  private get wrapperTransformCenter(): string {
    return "translate3d(0, 0, 0)";
  }

  // Getter method to calculate transition exit time.
  private get sliderTransitionExitTime(): string {
    const { transitionTime, exitTransitionTime } = this.props.childStyles;
    const time = exitTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either exitTransitionTime or transitionTime should be present as props",
      );
    }
    return time + "s";
  }

  // Getter method to calculate transition enter time.
  private get sliderTransitionEnterTime(): string {
    const { transitionTime, enterTransitionTime } = this.props.childStyles;
    const time = enterTransitionTime || transitionTime;
    if (!time) {
      throw new Error(
        "Either enterTransitionTime or transitionTime should be present as props",
      );
    }
    return time + "s";
  }

  // Getter method to calculate transition enter timing function css property.
  private get sliderEnterTimingFunction(): string {
    const { timingFunction, enterTimingFunction } = this.props.childStyles;
    return enterTimingFunction || timingFunction || "linear";
  }

  // Getter method to calculate transition exit timing function css property.
  private get sliderExitTimingFunction(): string {
    const { timingFunction, exitTimingFunction } = this.props.childStyles;
    return exitTimingFunction || timingFunction || "linear";
  }

  // Getter method to calculate css transform of entering element.
  // Calculates according to direction in which it will be transitioning.
  private get enteringTransform(): string {
    const { direction } = this.props;
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

  // Getter method to calculate css transform of exiting element.
  // Calculates according to direction in which it will be transitioning.
  private get exitingTransform(): string {
    const { direction } = this.props;
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

  // Get the wrapper css style, non dependent on state of transition.
  private get cssWrapperStyle(): React.CSSProperties {
    const rtgWrapperStyles = getSliderStyles().rtgWrapper;
    return { ...rtgWrapperStyles, width: this.props.childStyles.width };
  }

  // Abstraction of rendering child element. Used inside JSX rendering of child elem.
  private renderTransitioningChild(
    transitioningComponentChildProps: ITransitioningComponentChildProps,
  ): JSX.Element {
    return (
      <TransitioningComponentChild {...transitioningComponentChildProps} />
    );
  }

  // Transition complete function
  // tslint:disable-next-line:no-shadowed-variable
  private addEndListener = (node: HTMLElement, done: () => void) => {
    node.addEventListener(
      "transitionend",
      () => {
        done();
        if (this.props.transitionEndCallback) {
          this.props.transitionEndCallback();
        }
      },
      false,
    );
  };
}
