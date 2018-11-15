import * as React from "react";
import { IRevealChildStyles, IRevealDirection } from "./types";
import { Transition } from "react-transition-group";

export interface IRevealPropType {
  show: boolean;
  direction: IRevealDirection;
  withFade?: boolean;
  fixedDistance?: number;
  childStyles: IRevealChildStyles;
  mountUnmountAuthority?: boolean;
}

/**
 * @prop show: boolean
 * @prop direction: like ISliderDirection 0: left, 1: right, 2: up, 3: down
 * @prop withFade?: boolean
 * @prop fixedDistance?: revealTill a distance and show scrollbar
 * @prop childStyles?: all lise ISliderChildStyles except width or height
 * @prop mountUnmountAuthority
 */
export default class Reveal extends React.Component<IRevealPropType, any> {
  public render() {
    this.checkBeforeRender();
    const { show, mountUnmountAuthority, children, withFade } = this.props;
    return (
      <Transition
        in={show}
        mountOnEnter={mountUnmountAuthority}
        unmountOnExit={mountUnmountAuthority}
        timeout={{
          enter: 1,
          exit: this.exitTransitionTime * 1000
        }}
      >
        {state => {
          let wrapperStyle;
          switch (state) {
            case "entering":
              wrapperStyle = {
                maxHeight: 0,
                opacity: withFade ? 0 : 1
              };
              break;
            case "entered":
              wrapperStyle = {
                maxHeight: "100vh",
                opacity: 1,
                transition: `max-height ${this.enterTransitionTime}s ${
                  this.enterTimingFunction
                }, opacity ${this.enterTransitionTime}s ${
                  this.enterTimingFunction
                }`
              };
              break;
            case "exiting":
              wrapperStyle = {
                maxHeight: 0,
                opacity: withFade ? 0 : 1,
                transition: `max-height ${this.exitTransitionTime}s ${
                  this.exitTimingFunction
                }, opacity ${this.exitTransitionTime}s ${
                  this.exitTimingFunction
                }`
              };
              break;
            case "exited":
              wrapperStyle = {
                maxHeight: 0,
                opacity: withFade ? 0 : 1
              };
              break;
          }
          const allStyles = { ...wrapperStyle, ...this.normalStyles };
          return <div style={allStyles}>{children}</div>;
        }}
      </Transition>
    );
  }

  private checkBeforeRender = () => {
    const {
      transitionTime,
      enterTransitionTime,
      exitTransitionTime
    } = this.props.childStyles;

    if (!transitionTime) {
      if (!(enterTransitionTime && exitTransitionTime)) {
        throw new Error(
          "If transition time is not defined then both enter transition time and exit transition time should be defined"
        );
      }
    }
  };

  private get enterTransitionTime(): number {
    const { transitionTime, enterTransitionTime } = this.props.childStyles;
    return enterTransitionTime || transitionTime || 1;
  }

  private get exitTransitionTime(): number {
    const { transitionTime, exitTransitionTime } = this.props.childStyles;
    return exitTransitionTime || transitionTime || 1;
  }

  private get enterTimingFunction(): string {
    const { timingFunction, enterTimingFunction } = this.props.childStyles;
    return enterTimingFunction || timingFunction || "linear";
  }

  private get exitTimingFunction(): string {
    const { timingFunction, exitTimingFunction } = this.props.childStyles;
    return exitTimingFunction || timingFunction || "linear";
  }

  private get normalStyles() {
    return {
      overflow: "hidden"
    };
  }
}
