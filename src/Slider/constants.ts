import { percentUnitType } from "./types";

export const percentCssUnit: percentUnitType = "%";

export const elementUnits: Set<string> = new Set(["em", "ch", "ex"]);

export const normalLengthUnits: Set<string> = new Set([
  "cm",
  "in",
  "mm",
  "pc",
  "pt",
  "px",
  "rem",
  "vh",
  "vmax",
  "vmin",
  "vw"
]);
