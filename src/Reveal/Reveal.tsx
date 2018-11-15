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
  revealOnAppear?: boolean;
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
    const {
      show,
      mountUnmountAuthority,
      children,
      withFade,
      revealOnAppear
    } = this.props;
    return (
      <Transition
        in={show}
        mountOnEnter={mountUnmountAuthority}
        unmountOnExit={mountUnmountAuthority}
        timeout={{
          enter: 1,
          exit: this.exitTransitionTime * 1000
        }}
        appear={revealOnAppear || false}
      >
        {state => {
          let wrapperStyle;
          switch (state) {
            case "entering":
              wrapperStyle = {
                ...this.cssHeightWidthPropWithValue(false),
                opacity: withFade ? 0 : 1
              };
              break;
            case "entered":
              wrapperStyle = {
                ...this.cssHeightWidthPropWithValue(true),
                opacity: 1,
                transition: `${this.cssDirection} ${
                  this.enterTransitionTime
                }s ${this.enterTimingFunction}, opacity ${
                  this.enterTransitionTime
                }s ${this.enterTimingFunction}`
              };
              break;
            case "exiting":
              wrapperStyle = {
                ...this.cssHeightWidthPropWithValue(false),
                opacity: withFade ? 0 : 1,
                transition: `${this.cssDirection} ${this.exitTransitionTime}s ${
                  this.exitTimingFunction
                }, opacity ${this.exitTransitionTime}s ${
                  this.exitTimingFunction
                }`
              };
              break;
            case "exited":
              wrapperStyle = {
                ...this.cssHeightWidthPropWithValue(false),
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

  private get cssDirection() {
    if (this.props.direction === IRevealDirection.MoveDown) {
      return "max-height";
    } else if (this.props.direction === IRevealDirection.MoveRight) {
      return "max-width";
    } else {
      throw new Error(
        "Either direction prop is not present or it's value provided is wrong"
      );
    }
  }

  private cssHeightWidthPropWithValue = (
    forMax: boolean
  ): React.CSSProperties => {
    let styles: React.CSSProperties = {};
    if (this.props.direction === IRevealDirection.MoveDown) {
      if (forMax) {
        styles = { maxHeight: "100vh" };
      } else {
        styles = {
          maxHeight: this.props.childStyles.minMeasureValue || "0px"
        };
      }
    } else if (this.props.direction === IRevealDirection.MoveRight) {
      if (forMax) {
        styles = { maxWidth: "100vw" };
      } else {
        styles = {
          maxWidth: this.props.childStyles.minMeasureValue || "0px"
        };
      }
    } else {
      throw new Error(
        "Either direction prop is not present or it's value provided is wrong"
      );
    }
    return styles;
  };
}
