import * as React from "react";
import { getWrapperStyles } from "./utils";
import { IWrapperStyles, TransitionStateTypes } from "./types";

export interface ITransitioningComponentChildProps {
  state: TransitionStateTypes;
  wrapperTransformCenter: string;
  sliderTransitionExitTime: string;
  sliderTransitionEnterTime: string;
  enteringTransform: string;
  exitingTransform: string;
  sliderEnterTimingFunction: string;
  sliderExitTimingFunction: string;
  fadeOnSlide: boolean;
  cssWrapperStyle: React.CSSProperties;
  child: JSX.Element;
  enter?: boolean;
}

export function TransitioningComponentChild(
  props: ITransitioningComponentChildProps
) {
  let wrapperStyles: IWrapperStyles;
  switch (props.state) {
    case "entering":
      wrapperStyles = getWrapperStyles(
        props.enteringTransform,
        "0",
        props.fadeOnSlide ? 0 : 1
      );
      break;
    case "entered":
      wrapperStyles = props.enter
        ? getWrapperStyles(
            props.wrapperTransformCenter,
            props.sliderTransitionEnterTime,
            1,
            props.sliderEnterTimingFunction
          )
        : getWrapperStyles(props.wrapperTransformCenter, "0", 1);
      break;
    case "exiting":
      wrapperStyles = getWrapperStyles(props.wrapperTransformCenter, "0", 1);
      break;
    case "exited":
      wrapperStyles = props.enter
        ? getWrapperStyles(
            props.enteringTransform,
            "0",
            props.fadeOnSlide ? 0 : 1
          )
        : getWrapperStyles(
            props.exitingTransform,
            props.sliderTransitionExitTime,
            props.fadeOnSlide ? 0 : 1,
            props.sliderExitTimingFunction
          );
      break;
    default:
      throw new Error("Transition has no state");
  }
  return (
    <div style={{ ...wrapperStyles, ...props.cssWrapperStyle }}>
      {props.child}
    </div>
  );
}
