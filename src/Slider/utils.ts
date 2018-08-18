import { IWrapperStyles } from './types'

/**
 * Function to get the wrapper style for transitioning child
 * @param transform Value of transform property of css
 * @param transition Value of transition property of css
 * @param opacity Value of opacity property of css
 * @param transitionTimingFunction Value of transition-timing-function property of css
 * @returns Css styles in json format
 */
export function getWrapperStyles(
  transform: string,
  transition: string,
  opacity: number,
  transitionTimingFunction?: string
): IWrapperStyles {
  return { transform, transition, opacity, transitionTimingFunction }
}
