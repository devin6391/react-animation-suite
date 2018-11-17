import { IWrapperStyles, cssUnitTypes } from "./types";
import { isNull } from "util";
// @ts-ignore
import units from "units-css";
import { percentCssUnit, elementUnits, normalLengthUnits } from "./constants";

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
  return { transform, transition, opacity, transitionTimingFunction };
}

/**
 * This function checks if a variable is not undef or not null
 * @param subjectArg
 */
export function noNullOrUndefined(subjectArg: any): boolean {
  return typeof subjectArg !== "undefined" && !isNull(subjectArg);
}

/**
 * This function converts css value which is present in px into desired css unit
 * @param targetUnit The unit to be converted into
 * @param value Value in pixels
 * @param parentDomRef Parent DOM ref of element whose unit is being converted
 * @param cssProperty CSS property for which this conversion is desired
 */
export function convertCssUnit(
  targetUnit: cssUnitTypes,
  value: number,
  parentDomRef: HTMLElement,
  cssProperty: string
): string {
  const source = value + "px";
  if (targetUnit === percentCssUnit) {
    return units.convert(targetUnit, source, parentDomRef, cssProperty);
  } else if (elementUnits.has(targetUnit)) {
    return units.convert(targetUnit, source, parentDomRef);
  } else if (normalLengthUnits.has(targetUnit)) {
    return units.convert(targetUnit, source);
  } else {
    throw new Error("Please refer to docs on which css units are allowed");
  }
}
