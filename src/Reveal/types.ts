export enum IRevealDirection {
  MoveDown,
  MoveRight
}

export interface IRevealChildStyles {
  transitionTime?: number;
  enterTransitionTime?: number;
  exitTransitionTime?: number;
  timingFunction?: string;
  enterTimingFunction?: string;
  exitTimingFunction?: string;
  minMeasureValue?: number;
  extraStyles?: React.CSSProperties;
}
