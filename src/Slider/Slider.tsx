import * as React from "react";
import getSliderStyles from "./styles";
import TransitioningComponent from "./TransitioningComponent";
import {
  ISliderChildStyles,
  ISliderDirection,
  SliderCycleState
} from "./types";
import { isNull } from "util";
import { noNullOrUndefined } from "./utils";

export interface ISliderProps {
  // The property to watch on which sliding will occur. This must be a primitive type.
  watchProp: string | number | boolean;
  // The properties of child element.
  childProps: any;
  // The direction in which this change's sliding effect should go.
  direction: ISliderDirection;
  // This child JSX element wrapped in Slider component on which sliding effect will happen.
  children: JSX.Element;
  // Some styles of children, which includes width, height and transition timing related styles.
  childStyles: ISliderChildStyles;
  // If we want the sliding effect when we first see the screen.
  slideOnAppear?: boolean;
  // Should the slide fade on entering or exiting.
  fadeOnSlide?: boolean;
  // Percentage of size which should be there even if exit/enter is done. Useful only with fadeOnSlide prop.
  sizePercentageDuringSlide?: number;
  // Css class that a developer wants on Slider component - these properties will be overrridden
  // margin, position, display and overflow. !important may override them but be cautious!!!
  className?: string;
  // TransitionDone callback
  transitionDone?: () => void;
}

interface ISliderState {
  prevWatchProp: any; // prev watch prop value.
  prevChildProps: any; // prev properties of child.
  nextWatchProp: any; // new watch prop value.
  nextChildProps: any; // new properties of child.
}

/**
 * @prop watchProp - The property to watch if on which sliding will occur. This must be a literal value.
 * @prop childProps - The properties of child element.
 * @prop direction - The direction in which this change's sliding effect should go.
 * @prop children - This child JSX element wrapped in Slider component on which sliding effect will happen.
 * @prop childStyles - Some styles of children, which includes width, height and transition timing related styles.
 * @prop slideOnAppear - If we want the sliding effect when we first see the screen. Optional Prop.
 * @prop fadeOnSlide - Should the slide fade on entering or exiting. Optional Prop.
 * @prop sizePercentageDuringSlide - % of size which should be on screen. Useful only with fadeOnSlide prop. Optional.
 * @prop transitionDone - Transition done callback. Optional.
 */
export default class Slider extends React.Component<
  ISliderProps,
  ISliderState
> {
  public static getDerivedStateFromProps(
    nextProps: ISliderProps,
    prevState: ISliderState
  ) {
    return {
      nextChildProps: nextProps.childProps,
      nextWatchProp: nextProps.watchProp,
      prevChildProps: prevState.nextChildProps,
      prevWatchProp: prevState.nextWatchProp
    };
  }

  public transitionCycle: SliderCycleState = SliderCycleState.Full;

  private selfRef: HTMLDivElement | null = null;
  private firstRender: boolean = true;
  private curWatchCount: number = 0;
  private prevWatchCount: number = 0;

  constructor(props: ISliderProps) {
    super(props);
    this.state = {
      nextChildProps: null,
      nextWatchProp: null,
      prevChildProps: null,
      prevWatchProp: null
    };
  }

  public shouldComponentUpdate(nextProps: ISliderProps): boolean {
    const validTransitionCycleState =
      this.transitionCycle === SliderCycleState.Full ||
      this.transitionCycle === SliderCycleState.Start;
    const isWatchPropDifferent = this.props.watchProp !== nextProps.watchProp;
    return validTransitionCycleState && isWatchPropDifferent;
  }

  public render() {
    this.beforeUpdationProcess();
    const { width, height } = this.props.childStyles;
    const rtgListStyles = getSliderStyles().rtgList;
    const styles = { ...rtgListStyles, width, height };
    return (
      <div
        ref={elem => (this.selfRef = elem)}
        style={styles}
        className={this.props.className}
      >
        {this.getCLonedElems()}
      </div>
    );
  }

  private beforeUpdationProcess() {
    const { children, watchProp } = this.props;
    if (!React.isValidElement(children)) {
      throw new Error("Wrapped child is not a valid react element");
    }
    if (Array.isArray(children)) {
      throw new Error("Only single child can be passed in slider component");
    }
    if (typeof children === "string") {
      throw new Error(
        "Wrapped child cannot be string, it should be a single react element"
      );
    }
    if (typeof watchProp === "undefined" || isNull(watchProp)) {
      throw new Error("**watchProp** cannot be null or undefined");
    }
    if (watchProp === Object(watchProp)) {
      throw new Error("**watchProp** must be either string, number or boolean");
    }
    if (this.transitionCycle !== SliderCycleState.Full) {
      console.warn(
        `Slider\(React-Animation-Suite\): You should not change properties unless transition cycle is fully complete.
        Please manage this in your code by using **transitionDone** callback prop`
      );
    }
    if (!this.firstRender) {
      this.transitionCycle = SliderCycleState.Start;
    } else {
      this.firstRender = false;
    }
    if (this.state.nextWatchProp !== this.state.prevWatchProp) {
      this.prevWatchCount = this.curWatchCount;
      this.curWatchCount += 1;
    }
  }

  private enterTransitionDone = () => {
    this.transitionCycle = SliderCycleState.Full;
    if (this.props.transitionDone) {
      this.props.transitionDone();
    }
  };

  /**
   * This method makes two clones of child.
   * One with current properties which will enter and another with previous properties which will exit.
   */
  private getCLonedElems = () => {
    const {
      prevWatchProp,
      prevChildProps,
      nextWatchProp,
      nextChildProps
    } = this.state;
    const {
      direction,
      childStyles,
      slideOnAppear,
      fadeOnSlide,
      sizePercentageDuringSlide,
      children
    } = this.props;
    const clonedElems = [];
    const enterTimeout =
      (childStyles.transitionTime || childStyles.enterTransitionTime || 1) *
      100;
    const exitTimeout =
      (childStyles.transitionTime || childStyles.exitTransitionTime || 1) * 100;
    const preparedChildStylesEnter: ISliderChildStyles = {
      ...childStyles,
      zIndex: 2
    };
    if (noNullOrUndefined(nextWatchProp) && nextChildProps) {
      clonedElems.push(
        <TransitioningComponent
          enter={true}
          direction={direction}
          key={"s_" + this.curWatchCount + nextWatchProp}
          appear={slideOnAppear || noNullOrUndefined(prevWatchProp)}
          parentRef={this.selfRef}
          childStyles={preparedChildStylesEnter}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSlide={sizePercentageDuringSlide}
          timeout={enterTimeout}
          transitionEndCallback={this.enterTransitionDone}
        >
          {React.cloneElement(children, nextChildProps)}
        </TransitioningComponent>
      );
    }
    const preparedChildStylesExit: ISliderChildStyles = {
      ...childStyles,
      zIndex: 1
    };
    if (
      noNullOrUndefined(prevWatchProp) &&
      prevWatchProp !== nextWatchProp &&
      prevChildProps
    ) {
      clonedElems.push(
        <TransitioningComponent
          enter={false}
          direction={direction}
          key={"s_" + this.prevWatchCount + prevWatchProp}
          appear={true}
          parentRef={this.selfRef}
          childStyles={preparedChildStylesExit}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSlide={sizePercentageDuringSlide}
          timeout={exitTimeout}
        >
          {React.cloneElement(children, prevChildProps)}
        </TransitioningComponent>
      );
    }
    return clonedElems;
  };
}
