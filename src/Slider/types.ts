export interface ISliderChildStyles {
  width: number // Width of child element of Slider component.
  height: number // Height of child element of Slider component.
  transitionTime?: number // Transition time. If this is not present then enterTransitionTime and exitTransitionTime should be there.
  enterTransitionTime?: number // Enter transition time. Will override transitionTime prop.
  exitTransitionTime?: number // Exit transition time. Will override transitionTime prop.
  timingFunction?: string // Transition timing function. If this is not present then enterTimingFunction and exitTimingFunction should be there.
  enterTimingFunction?: string // Enter transition timing function. Will override timingFunction prop.
  exitTimingFunction?: string // Exit transition timing function. Will override timingFunction prop.
}

export const enum ISliderDirection {
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveDown
}

export interface IWrapperStyles {
  transform: string // CSS transform property.
  transition: string // CSS transition property.
  opacity: number // CSS opacity property.
  transitionTimingFunction?: string // CSS transition-timing-function property.
}

export type TransitionStateTypes = 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'
