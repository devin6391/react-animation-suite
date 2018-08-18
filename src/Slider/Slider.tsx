import * as React from "react";
import getSliderStyles from "./styles";
import TransitioningComponent from "./TransitioningComponent";
import { ISliderChildStyles, ISliderDirection } from "./types";

interface ISliderProps {
  // The property to watch on which sliding will occur. This must be a literal value.
  watchProp: any;
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

  private selfRef: HTMLDivElement | null = null;

  constructor(props: ISliderProps) {
    super(props);
    this.state = {
      nextChildProps: null,
      nextWatchProp: null,
      prevChildProps: null,
      prevWatchProp: null
    };
  }

  public render() {
    const { width, height } = this.props.childStyles;
    const rtgListStyles = getSliderStyles().rtgList;
    const styles = { ...rtgListStyles, width, height };
    return (
      <div ref={elem => (this.selfRef = elem)} style={styles}>
        {this.getCLonedElems()}
      </div>
    );
  }

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
    if (nextWatchProp && nextChildProps) {
      clonedElems.push(
        <TransitioningComponent
          enter={true}
          direction={direction}
          key={nextWatchProp}
          appear={slideOnAppear || !!prevWatchProp}
          parentRef={this.selfRef}
          childStyles={childStyles}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSlide={sizePercentageDuringSlide}
          timeout={1}
        >
          {React.cloneElement(children, nextChildProps)}
        </TransitioningComponent>
      );
    }
    if (prevWatchProp && prevWatchProp !== nextWatchProp && prevChildProps) {
      clonedElems.push(
        <TransitioningComponent
          enter={false}
          direction={direction}
          key={prevWatchProp}
          appear={true}
          parentRef={this.selfRef}
          childStyles={childStyles}
          fadeOnSlide={fadeOnSlide}
          sizePercentageDuringSlide={sizePercentageDuringSlide}
          timeout={1}
        >
          {React.cloneElement(children, prevChildProps)}
        </TransitioningComponent>
      );
    }
    return clonedElems;
  };
}
