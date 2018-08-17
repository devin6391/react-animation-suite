import * as React from "react";
import sliderStyles from "./styles";
import injectSheet from "react-jss";
import TransitioningComponent from "./TransitioningComponent";
import { ISliderChildStyles, ISliderDirection } from "./types";

interface ISliderProps {
  watchProp: any; // The property to watch on which sliding will occur. This must be a literal value.
  childProps: any; // The properties of child element.
  direction: ISliderDirection; // The direction in which this change's sliding effect should go.
  classes: any; // These are passed from JSS so it should be null, no support for external classes for now.
  children: JSX.Element; // This child JSX element wrapped in Slider component on which sliding effect will happen.
  childStyles: ISliderChildStyles; // Some styles of children, which includes width, height and transition timing related styles.
  slideOnAppear?: boolean; // If we want the sliding effect when we first see the screen.
  fadeOnSlide?: boolean; // Should the slide fade on entering or exiting.
  sizePercentageDuringSlide?: number; // Percentage of size which should be there even if exit/enter is done. Useful only with fadeOnSlide prop.
}

interface ISliderState {
  prevWatchProp: any; // prev watch prop value.
  prevChildProps: any; // prev properties of child.
  nextWatchProp: any; // new watch prop value.
  nextChildProps: any; // new properties of child.
}

class Slider extends React.Component<ISliderProps, ISliderState> {
  constructor(props: ISliderProps) {
    super(props);
    this.state = {
      prevWatchProp: null,
      prevChildProps: null,
      nextWatchProp: null,
      nextChildProps: null
    };
  }

  private selfRef: HTMLDivElement | null = null;

  static getDerivedStateFromProps(
    nextProps: ISliderProps,
    prevState: ISliderState
  ) {
    return {
      prevWatchProp: prevState.nextWatchProp,
      prevChildProps: prevState.nextChildProps,
      nextWatchProp: nextProps.watchProp,
      nextChildProps: nextProps.childProps
    };
  }

  /**
   * This method makes two clones of child. One with current properties which will enter and another with previous properties which will exit.
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
      classes,
      childStyles,
      slideOnAppear,
      fadeOnSlide,
      sizePercentageDuringSlide,
      children
    } = this.props;
    let clonedElems = [];
    if(!React.isValidElement(children)) {
      throw new Error("Wrapped child is not a valid react element");
    }
    if(Array.isArray(children)) {
      throw new Error("Only single child can be passed in slider component");
    }
    if(typeof children === "string") {
      throw new Error("Wrapped child cannot be string, it should be a single react element");
    }
    nextWatchProp &&
      nextChildProps &&
      clonedElems.push(
        <TransitioningComponent
          enter={true}
          classes={classes}
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
    prevWatchProp &&
      prevWatchProp !== nextWatchProp &&
      prevChildProps &&
      clonedElems.push(
        <TransitioningComponent
          enter={false}
          classes={classes}
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
    return clonedElems;
  };

  render() {
    const { width, height } = this.props.childStyles;
    return (
      <div
        ref={elem => (this.selfRef = elem)}
        className={this.props.classes.rtgList}
        style={{
          width,
          height
        }}
      >
        {this.getCLonedElems()}
      </div>
    );
  }
}

/**
 * @prop watchProp - The property to watch if on which sliding will occur. This must be a literal value.
 * @prop childProps - The properties of child element.
 * @prop direction - The direction in which this change's sliding effect should go.
 * @prop classes - These are passed from JSS so it should be null, no support for external classes for now.
 * @prop children - This child JSX element wrapped in Slider component on which sliding effect will happen.
 * @prop childStyles - Some styles of children, which includes width, height and transition timing related styles.
 * @prop slideOnAppear - If we want the sliding effect when we first see the screen. Optional Prop.
 * @prop fadeOnSlide - Should the slide fade on entering or exiting. Optional Prop.
 * @prop sizePercentageDuringSlide - Percentage of size which should be there even if exit/enter is done. Useful only with fadeOnSlide prop. Optional Prop.
 */
const StyledSlider = injectSheet(sliderStyles)(Slider);
export default StyledSlider;
