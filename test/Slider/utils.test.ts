import * as Utils from "../../src/Slider/utils";

describe("Test for utilities of slider package", () => {
  describe("Test getWrapperStyles fn", () => {
    const args = {
      opacity: 1,
      transform: "20px",
      transition: "30s",
      transitionTimingFunction: "foo"
    };
    it("returns constructs css styles", () => {
      expect(
        Utils.getWrapperStyles(
          args.transform,
          args.transition,
          args.opacity,
          args.transitionTimingFunction
        )
      ).toEqual(args);
    });
  });

  describe("Test noNullOrUndefined fn", () => {
    it("Return true if any value is not undefined or null", () => {
      const foo = false;
      expect(Utils.noNullOrUndefined(foo)).toBeTruthy();
    });
    it("Return false if any value is null", () => {
      const foo = null;
      expect(Utils.noNullOrUndefined(foo)).toBeFalsy();
    });
    it("Return false if any value is undefined", () => {
      const foo = undefined;
      expect(Utils.noNullOrUndefined(foo)).toBeFalsy();
    });
  });
});
