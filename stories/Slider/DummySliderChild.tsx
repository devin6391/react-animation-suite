import * as React from "react";

interface IDummySliderChildProps {
  firstName: string;
  lastName: string;
  doesSing: boolean;
  age: number;
}

/**
 * Dummy slider
 * @param props 
 */
export default function(props: IDummySliderChildProps) {
  return (
    <div style={{ height: "100px", width: "100px", display: "block" }}>
      <span>{props.firstName}</span>
      <span>{props.lastName}</span>
    </div>
  );
}
