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
});
