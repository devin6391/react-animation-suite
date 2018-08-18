export interface ISliderChildStyles {
  // Width of child element of Slider component.
  width: number
  // Height of child element of Slider component.
  height: number
  // Transition time. If this is not present then enterTransitionTime and exitTransitionTime should be there.
  transitionTime?: number
  // Enter transition time. Will override transitionTime prop.
  enterTransitionTime?: number
  // Exit transition time. Will override transitionTime prop.
  exitTransitionTime?: number
  // Transition timing function. If this is not present then enterTimingFunction and exitTimingFunction should be there.
  timingFunction?: string
  // Enter transition timing function. Will override timingFunction prop.
  enterTimingFunction?: string
  // Exit transition timing function. Will override timingFunction prop.
  exitTimingFunction?: string
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
